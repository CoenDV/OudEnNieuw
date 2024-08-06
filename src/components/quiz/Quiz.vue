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
            isAnwseredCorrectly: false,
            question: '',
            answers: [],
            correctAnswer: '',
            answeredQuestion: ''
        }
    },
    methods: {
        sendAnswer(answerIndex) {
            if (this.isAnwsered)
                console.log("You already answered this question!");
            else {
                this.answeredQuestion = this.answers[answerIndex];
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
            brokerURL: this.$webSocketLink + 'gs-guide-websocket'
        });

        this.stompClient.onConnect = (frame) => {
            console.log("Connected: " + frame);

            // subscribe for new questions
            this.stompClient.subscribe('/topic/quiz-mainscreen', (result) => {
                this.isActive = true;
                const Response = JSON.parse(result.body);
                console.log("Received: " + JSON.stringify(Response));

                if (Response == true) {
                    this.isActive = true;
                } else if (Response == false) {
                    this.isActive = false;
                } else if (Response === "showAnswer") {
                    console.log("Show answer");
                    this.isAnwsered = true;
                    if (this.answeredQuestion === this.correctAnswer) {
                        this.isAnwseredCorrectly = 1;
                    } else {
                        this.isAnwseredCorrectly = 2;
                    }
                }
                else {
                    this.question = Response.question;
                    this.answers = Response.options;
                    this.correctAnswer = Response.answer;
                    this.questionNr++;
                    this.isAnwsered = false;
                    this.isAnwseredCorrectly = 0;
                }
            });
            // subscribe for answering questions
            this.stompClient.subscribe('/topic/greetings', (result) => {
                const Response = JSON.parse(result.body);
                if (Response.user.userId === this.user.userId) {
                    console.log("Received: " + JSON.stringify(Response));
                    if (Response.points > 0) {                        localStorage.setItem('user', JSON.stringify(Response.user));
                        this.user = Response.user;
                    }
                }
            });
        }

        this.stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);

            // Additional logging to understand the error object
            if (error instanceof Event) {
                console.error('Error is an Event:', error.type);
                if (error.target) {
                    console.error('WebSocket state:', error.target.readyState);
                }
            } else if (error instanceof Error) {
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            } else {
                console.error('Unexpected error type:', typeof error);
            }

            this.stompClient.deactivate();
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
    <Header></Header>

    <div v-if="!isActive" class="container-fluid mt-5">
        <h1 class="text-center text-light">No Quiz active at the moment...</h1>
    </div>

    <div v-else class="container-fluid">
        <!-- display answer options -->
        <div v-if="!isAnwsered">
            <h1 class="text-center text-light my-3"> Points: {{ user.points }} </h1>
            <img v-if="answers[0]" src="/images/buttonRed.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
                @click="sendAnswer(0)">
            <img v-if="answers[1]" src="/images/buttonBlue.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
                @click="sendAnswer(1)">
            <img v-if="answers[2]" src="/images/buttonYellow.png" alt="quiz" class="m-1"
                style="width: 47%; height: 47%;" @click="sendAnswer(2)">
            <img v-if="answers[3]" src="/images/buttonGreen.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
                @click="sendAnswer(3)">
            <h1 v-else class="text-center text-light mt-5">Waiting for next Question</h1>
        </div>
        <!-- display answer status -->
        <div v-else>
            <div v-if="isAnwseredCorrectly == 0">
                <h1 class="text-center text-light">Je hebt de vraag beantwoord!</h1>
                <img src="/images/neutralAnswer.png" alt="Correct Answer" style="width: 100%; height: 100%;">
            </div>
            <div v-if="isAnwseredCorrectly == 1">
                <h1 class="text-center text-light">Je hebt de vraag <span style="color: #26890C;">GOED</span>  beantwoord!</h1>
                <img src="/images/correctAnswer.png" alt="Correct Answer" style="width: 100%; height: 100%;">
            </div>
            <div v-else-if="isAnwseredCorrectly == 2">
                <h1 class="text-center text-light">Je hebt de vraag <span style="color: #E21B3C;">FOUT</span> beantwoord!</h1>
                <img src="/images/wrongAnswer.png" alt="Wrong Answer" style="width: 100%; height: 100%;">
            </div>
        </div>
    </div>
</template>

<style></style>