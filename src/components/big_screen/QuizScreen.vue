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
            correctAnswer: '',

            item: {},

            isActive: false,
            showAnswer: false,
            stompClient: null,
            activeBoosters: [],
            countdownTimer: null,
        }
    },
    methods: {
        updateActiveBoosters() {
            this.activeBoosters.forEach(booster => {
                // Get the current date
                let currentDate = new Date();

                // Split the time string into parts
                let timeParts = booster.duration.split(':');

                // add the time to the current date
                let duration = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours() + parseInt(timeParts[0]), currentDate.getMinutes() + parseInt(timeParts[1]), currentDate.getSeconds() + parseInt(timeParts[2]));
                
                if (duration < currentDate)
                    this.activeBoosters.splice(this.activeBoosters.indexOf(booster), 1);
                else
                    booster.duration = new Date(duration.getTime() - new Date().getTime()).toISOString().substr(11, 8);
            });
        }
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
        this.countdownTimer = setInterval(this.updateActiveBoosters, 1000);

        this.stompClient = new StompJs.Client({
            brokerURL: this.$webSocketLink + 'gs-guide-websocket'
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
                    this.activeBoosters.push(Response);
                    this.loadComponent(); // open shop item popup
                } else if (Response.objectType == 'QUESTION') {
                    this.question = Response.question;
                    this.answers = Response.options;
                    this.correctAnswer = Response.answer;
                    this.showAnswer = false;
                } else if (Response === "showAnswer") {
                    console.log("Show answer");
                    this.showAnswer = true;
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
        <!-- Active Boosters-->
        <div class="col-2 row text-center mt-5 g-0">
            <h2 class="text-light">Active Boosters</h2>
            <div class="col-6 p-1" v-for="booster in activeBoosters" :key="booster.id">
                <img :src="'/images/shop/' + booster.title + '.png'" alt="Quiz" class="img-fluid">
                <p :id="'booster' + this.activeBoosters.indexOf(booster)">{{ booster.duration }}</p>
            </div>
        </div>
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

                <div v-if="!showAnswer">
                    <div class="row mt-5 d-flex justify-content-center">
                        <div v-if="answers[0]" class="col-5 position-relative">
                            <img src="/images/quizDesktop/redButton.png" alt="Red Button" class="img-fluid">
                            <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[0] }}
                            </h2>
                        </div>
                        <div v-if="answers[1]" class="col-5 position-relative">
                            <img src="/images/quizDesktop/blueButton.png" alt="Red Button" class="img-fluid">
                            <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[1] }}
                            </h2>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center mt-4">
                        <div v-if="answers[2]" class="col-5 position-relative">
                            <img src="/images/quizDesktop/yellowButton.png" alt="Red Button" class="img-fluid">
                            <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[2] }}
                            </h2>
                        </div>
                        <div v-if="answers[3]" class="col-5 position-relative">
                            <img src="/images/quizDesktop/greenButton.png" alt="Red Button" class="img-fluid">
                            <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[3] }}
                            </h2>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h1 class="text-light text-center mt-5">Het juiste antwoord is:</h1>
                    <div class="row mt-5 d-flex justify-content-center">
                        <div v-if="correctAnswer == answers[0]" class="col-5 position-relative">
                            <img src="/images/quizDesktop/redButton.png" alt="Red Button" class="img-fluid">
                            <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[0] }}
                            </h2>
                        </div>
                        <div v-if="correctAnswer == answers[1]" class="col-5 position-relative">
                            <img src="/images/quizDesktop/blueButton.png" alt="Red Button" class="img-fluid">
                            <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[1] }}
                            </h2>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center mt-4">
                        <div v-if="correctAnswer == answers[2]" class="col-5 position-relative">
                            <img src="/images/quizDesktop/yellowButton.png" alt="Red Button" class="img-fluid">
                            <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[2] }}
                            </h2>
                        </div>
                        <div v-if="correctAnswer == answers[3]" class="col-5 position-relative">
                            <img src="/images/quizDesktop/greenButton.png" alt="Red Button" class="img-fluid">
                            <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[3] }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Active Boosters-->
        <div class="col-12 row  mb-5 g-0 fixed-bottom">
            <h2 class="text-light col-11 ms-2">Active Boosters</h2>
            <div class="col-1 p-1 ms-2" v-for="booster in activeBoosters" :key="booster.id">
                <img :src="'/images/shop/' + booster.title + '.png'" alt="Quiz" class="img-fluid">
                <p class="text-center" :id="'booster' + this.activeBoosters.indexOf(booster)">{{ booster.duration }}</p>
            </div>
        </div>
    </div>
</template>

<style></style>