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

    <section v-if="!loggedIn" class="container d-flex align-items-center justify-content-center mt-5">
        <div class="card col-3 p-3">
            <img src="/public/images/logo.png" class="card-img-top img-fluid mx-auto" alt="...">
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

    <section v-else class="container d-flex align-items-center justify-content-center mt-5 row">
        <div class="row justify-content-center mt-5">
            <div class="card col-12 p-3">
                <h1 class="text-center text-light">Admin Panel</h1>
            </div>
        </div>
        <div class="row justify-content-center mt-5">
            <div class="card col-5 p-3 m-3">
                <h2 class="text-center text-light">Add points to player</h2>
                <select id="userOptions" class="form-select" aria-label="Default select example">
                    <option selected>Select a player</option>
                    <option v-for="user in users" :value="user.username">{{ user.username }}</option>
                </select>
                <input id="points" type="number" class="form-control mt-3" placeholder="Amount of points">
                <button class="btn col-12 mt-3" @click="addPoints">Add points</button>
            </div>
            <div class="card col-5 p-3 m-3">
                <h2 class="text-center text-light">Add points to player</h2>
            </div>
        </div>
    </section>
</template>

<style></style>