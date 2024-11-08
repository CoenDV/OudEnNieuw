<script>
import axios from './../../axios-auth';
import Header from './../Header.vue';

export default {
    name: "Admin",
    components: {
        Header,
    },
    data() {
        return {
            loggedIn: false,
            users: [],
            quizzes: [],
            quizStarted: false,
            question: '',
            explanation: '',
        }
    },
    methods: {
        login(username) {
            if (username == 'admin123') {
                this.loggedIn = true;
            }
        },
        getUsers() {
            // Get the users from the database
            axios.get('/login')
                .then(response => {
                    console.log(response.data);
                    this.users = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getQuizzes() {
            // Get the quizzes from the database
            axios.get('/quiz')
                .then(response => {
                    console.log(response.data);
                    this.quizzes = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        addPoints() {
            let username = document.getElementById('userOptions').options[document.getElementById('userOptions').selectedIndex].value;
            let points = document.getElementById('points').value;
            axios.put('/login', { username: username, points: points })
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data))
                })
                .catch(error => {
                    console.log(error);
                });
        },
        startQuiz() {
            axios.post('/quiz/start/'+document.getElementById('quizOptions').options[document.getElementById('quizOptions').selectedIndex].value)
                .then(response => {
                    console.log(response.data);
                    this.quizStarted = true;

                })
                .catch(error => {
                    console.log(error);
                });
        },
        nextQuestion() {
            axios.post('/quiz/next')
                .then(response => {
                    console.log(response.data);
                    if (!response.data)
                        this.quizStarted = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showAnswerMethod() {
            axios.post('/quiz/answer')
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getUsers();
        this.getQuizzes();

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
                    this.loadComponent(); // open shop item popup
                } else if (Response.objectType == 'QUESTION') {
                    this.question = Response.question;
                    this.answers = Response.options;
                    this.correctAnswer = Response.answer;
                    this.showAnswer = false;
                    this.explanation = Response.explanation;
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
    }
};
</script>

<template>
    <Header></Header>

    <!-- login form -->
    <section v-if="!loggedIn" class="container d-flex align-items-center justify-content-center mt-5 ">
        <div class="card p-3">
            <img src="/images/logo.png" class="card-img-top img-fluid mx-auto" alt="...">
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label for="Username" class="form-label">Username</label>
                        <input type="password" class="form-control" id="Username" name="username" v-model="username">
                    </div>
                    <input type="button" class="btn col-12" value="Login" @click="login(username)" />
                </form>
            </div>
        </div>
    </section>

    <!-- admin panel -->
    <section v-else class="container-fluid d-flex justify-content-center ms-1 row">
        <div class=" justify-content-center mt-3">
            <div class="card col-12 py-3">
                <h1 class="text-center text-light">Admin Panel</h1>
            </div>
        </div>

        <div class=" justify-content-center">
            <!-- add points -->
            <div class="card py-3 my-3">
                <h2 class="text-center text-light">Add points to player</h2>
                <select id="userOptions" class="form-select" aria-label="Default select example">
                    <option selected>Select a player</option>
                    <option v-for="user in users" :value="user.username">{{ user.username }}</option>
                </select>
                <input id="points" type="tel" class="form-control mt-3" placeholder="Amount of points">
                <button class="btn col-12 mt-3" @click="addPoints">Add points</button>
            </div>

            <!-- Select Quiz -->
            <div v-if="!quizStarted" class="card py-3 my-3">
                <h2 class="text-center text-light">Select what quiz to play</h2>
                <select id="quizOptions" class="form-select" aria-label="Default select example">
                    <option selected>Select a Quiz</option>
                    <option v-for="quiz in quizzes" :value="quiz.quizId">{{ quiz.quizId }}</option>
                </select>
                <button class="btn col-12 mt-3" @click="startQuiz">Start Quiz</button>
            </div>

            <!-- next question -->
            <div v-else class="card py-3 mb-5">
                <h2 class="text-center text-light"> Next Question </h2>
                <button class="btn col-12 mt-1" @click="nextQuestion">Next Question</button>

                <h2 class="text-center text-light mt-3"> Show Answer </h2>
                <button class="btn col-12 mt-1" @click="showAnswerMethod">Show Answer</button>
            </div>

            <!-- question explanation -->
            <div class="card py-3 mb-5">
                <h2 class="text-center text-light"> Question Explanation </h2>
                <p class="text-center"> {{ question }} </p>
                <p class="text-center"> {{ answers }} </p>
                <p class="text-center"> {{ explanation }} </p>
            </div>

            <div class="mb-2">Als je dit ziet heb je een grote telefoon</div>
        </div>
    </section>
</template>

<style></style>