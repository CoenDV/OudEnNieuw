<script>
import Header from './../Header.vue';

export default {
    name: "Quiz",
    components: {
        Header,
    },
    data() {
        return {
            isActive: false,
            stompClient: null,
            user: JSON.parse(localStorage.getItem('user')),

            questionNr: 0,
            isAnwsered: false,
            question: '',
            answers: [],
        }
    },
    methods: {
        sendAnswer(answerIndex) {
            if (this.isAnwsered)
                alert("You already answered this question!");
            else {
                const body = {
                    userId: this.user.userId,
                    answer: this.answers[answerIndex]
                };
                this.stompClient.publish({
                    destination: '/app/hello',
                    body: JSON.stringify(body)
                });
                this.isAnwsered = true;
            }
        }
    },
    mounted() {
        this.stompClient = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket'
        });

        this.stompClient.onConnect = (frame) => {
            this.isActive = true;
            console.log("Connected: " + frame);

            // subscribe for new questions
            this.stompClient.subscribe('/topic/quiz-mainscreen', (result) => {
                const Response = JSON.parse(result.body);
                console.log("Received: " + JSON.stringify(Response));
                this.question = Response.question;
                this.answers = Response.options;
                this.questionNr++;
                this.isAnwsered = false;
            });
            // subscribe for answering questions
            this.stompClient.subscribe('/topic/greetings', (result) => {
                const Response = JSON.parse(result.body);
                if (Response.user.userId === this.user.userId) {
                    console.log("Received: " + JSON.stringify(Response));
                    if (Response.points > 0) {
                        alert("Correct answer!");
                        localStorage.setItem('user', JSON.stringify(Response.user));
                    } else {
                        alert("Wrong answer!");
                    }
                }
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

    <div v-else class="container-fluid mx-1 mt-5">
        <h1 class="text-center text-light"> Question Nummer: {{ questionNr }}</h1>
        <img v-if="answers[0]" src="/public/images/buttonRed.png" alt="quiz" class="m-1"
            style="width: 47%; height: 47%;" @click="sendAnswer(0)">
        <img v-if="answers[1]" src="/public/images/buttonBlue.png" alt="quiz" class="m-1"
            style="width: 47%; height: 47%;" @click="sendAnswer(1)">
        <img v-if="answers[2]" src="/public/images/buttonYellow.png" alt="quiz" class="m-1"
            style="width: 47%; height: 47%;" @click="sendAnswer(2)">
        <img v-if="answers[3]" src="/public/images/buttonGreen.png" alt="quiz" class="m-1"
            style="width: 47%; height: 47%;" @click="sendAnswer(3)">
    </div>
</template>

<style></style>