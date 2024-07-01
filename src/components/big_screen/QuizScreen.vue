<script>
import Header from './../Header.vue';

export default {
    name: "QuizScreen",
    components: {
        Header,
    },
    data() {
        return {
            question: '',

            answers: [],

            isActive: false,
            stompClient: null,
        }
    },
    methods: {

    },
    mounted() {
        this.stompClient = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket'
        });

        this.stompClient.onConnect = (frame) => {
            this.isActive = true;
            console.log("Connected: " + frame);
            this.stompClient.subscribe('/topic/quiz-mainscreen', (result) => {
                const Response = JSON.parse(result.body);
                console.log("Received: " + JSON.stringify(Response));
                this.question = Response.question;
                this.answers = Response.options;
            });
        }

        this.stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        this.stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.stompClient.activate();
    }
};
</script>

<template>
    <Header></Header>

    <div v-if="!isActive" class="container-fluid mx-1 mt-5">
        <h1 class="text-center text-light">No Quiz active at the moment...</h1>
    </div>

    <div v-else>
        <div class="container mt-5">
            <div class="row mt-5">
                <div class="col-12 mt-5 d-flex justify-content-center">
                    <h1 class="text-light">{{ question }}</h1>
                </div>
            </div>

            <div class="row mt-5 d-flex justify-content-center">
                <div v-if="answers[0]" class="col-5 position-relative">
                    <img src="./../../../public/images/quizDesktop/redButton.png" alt="Red Button" class="img-fluid">
                    <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[0] }}</h2>
                </div>
                <div v-if="answers[1]" class="col-5 position-relative">
                    <img src="./../../../public/images/quizDesktop/blueButton.png" alt="Red Button" class="img-fluid">
                    <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[1] }}</h2>
                </div>
            </div>
            <div class="row d-flex justify-content-center mt-4">
                <div v-if="answers[2]" class="col-5 position-relative">
                    <img src="./../../../public/images/quizDesktop/yellowButton.png" alt="Red Button" class="img-fluid">
                    <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[2] }}</h2>
                </div>
                <div v-if="answers[3]" class="col-5 position-relative">
                    <img src="./../../../public/images/quizDesktop/greenButton.png" alt="Red Button" class="img-fluid">
                    <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[3] }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>