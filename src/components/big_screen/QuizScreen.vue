<script>
import Header from './../Header.vue';
import { ref, defineAsyncComponent } from 'vue';
import shopPopUp from '../shop/shopPopUp.vue';


export default {
    name: "QuizScreen",
    components: {
        Header,
        shopPopUp
    },
    data() {
        return {
            question: '',

            answers: [],

            item: {},

            isActive: false,
            stompClient: null,
        }
    },
    methods: {

    },
    setup() {
        const asyncComponent = ref(null);

        const loadComponent = () => {
            asyncComponent.value = defineAsyncComponent(() =>
                import('../shop/shopPopUp.vue'),
                setTimeout(() => {
                    asyncComponent.value = null;
                }, 10000)
            );
        };

        return {
            asyncComponent,
            loadComponent,
        };
    },
    mounted() {
        this.stompClient = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket'
        });

        this.stompClient.onConnect = (frame) => {
            console.log("Connected: " + frame);
            this.stompClient.subscribe('/topic/quiz-mainscreen', (result) => {
                const Response = JSON.parse(result.body);
                console.log("Received: " + JSON.stringify(Response));

                if (Response == true) {
                    this.isActive = true;
                } else if (Response == false) {
                    this.isActive = false;
                    this.$router.push({ path: '/presentation' });
                } else if (Response.objectType == 'SHOPITEM') {
                    this.item = Response;
                    // open shop item popup
                    this.loadComponent();
                } else if (Response.objectType == 'QUESTION') {
                    this.question = Response.question;
                    this.answers = Response.options;
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
    },
    beforeDestroy() {
        this.stompClient.deactivate();
    }
};
</script>

<template>
    <component :is="asyncComponent" v-if="asyncComponent" :item="this.item"></component>

    <Header></Header>

    <div v-if="!isActive" class="container-fluid mt-5">
        <h1 class="text-center text-light">No Quiz active at the moment...</h1>
    </div>

    <div v-else>
        <div class="container mt-5">
            <div v-if="question == ''" class="row mt-5">
                <div class="col-12 mt-5 d-flex justify-content-center">
                    <h1 class="text-light"> Quiz is starting... </h1>
                </div>
            </div>

            <div v-else>
                <div class="row mt-5">
                    <div class="col-12 mt-5 d-flex justify-content-center">
                        <h1 class="text-light">{{ question }}</h1>
                    </div>
                </div>

                <div class="row mt-5 d-flex justify-content-center">
                    <div v-if="answers[0]" class="col-5 position-relative">
                        <img src="./../../../public/images/quizDesktop/redButton.png" alt="Red Button"
                            class="img-fluid">
                        <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[0] }}</h2>
                    </div>
                    <div v-if="answers[1]" class="col-5 position-relative">
                        <img src="./../../../public/images/quizDesktop/blueButton.png" alt="Red Button"
                            class="img-fluid">
                        <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[1] }}</h2>
                    </div>
                </div>
                <div class="row d-flex justify-content-center mt-4">
                    <div v-if="answers[2]" class="col-5 position-relative">
                        <img src="./../../../public/images/quizDesktop/yellowButton.png" alt="Red Button"
                            class="img-fluid">
                        <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[2] }}</h2>
                    </div>
                    <div v-if="answers[3]" class="col-5 position-relative">
                        <img src="./../../../public/images/quizDesktop/greenButton.png" alt="Red Button"
                            class="img-fluid">
                        <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[3] }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>