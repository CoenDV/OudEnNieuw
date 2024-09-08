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
            quizStarted: false,
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
            axios.post('/quiz/start')
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
        showAnswer() {
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
                <input id="points" type="number" class="form-control mt-3" placeholder="Amount of points">
                <button class="btn col-12 mt-3" @click="addPoints">Add points</button>
            </div>

            <!-- start quiz -->
            <div v-if="!quizStarted" class="card py-3 mb-5">
                <h2 class="text-center text-light"> Start Quiz </h2>
                <button class="btn col-12 mt-3" @click="startQuiz">Start Quiz</button>
            </div>

            <!-- next question -->
            <div v-else class="card py-3 mb-5">
                <h2 class="text-center text-light"> Next Question </h2>
                <button class="btn col-12 mt-1" @click="nextQuestion">Next Question</button>

                <h2 class="text-center text-light mt-3"> Show Answer </h2>
                <button class="btn col-12 mt-1" @click="showAnswer">Show Answer</button>
            </div>

            <div class="mb-2">Als je dit ziet heb je een grote telefoon</div>
        </div>
    </section>
</template>

<style></style>