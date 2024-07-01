<script>
import axios from '../../axios-auth';
import Header from './../Header.vue';

export default {
    name: "Challenge",
    components: {
        Header,
    },
    data() {
        return {
            activeChallenge: null,
            challengeCode: '',
            user: JSON.parse(localStorage.getItem("user")),
            deadlineTimer: JSON.parse(localStorage.getItem("deadline")),
            errorMessage: ''
        }
    },
    methods: {
        submitChallenge() {
            axios.get('/challenge/' + this.challengeCode + '/' + this.user.userId)
                .then(response => {
                    localStorage.setItem("activeChallenge", JSON.stringify(response.data));

                    if (localStorage.getItem("activeChallenge") != null || localStorage.getItem("activeChallenge") != undefined || localStorage.getItem("activeChallenge") != "") {
                        this.activeChallenge = JSON.parse(localStorage.getItem("activeChallenge"));
                        this.activeChallenge = response.data;

                        // Get the current date
                        let currentDate = new Date();

                        // Split the time string into parts
                        let timeParts = this.activeChallenge.deadline.split(':');

                        // add the time to the current date
                        let deadline = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours() + parseInt(timeParts[0]), currentDate.getMinutes() + parseInt(timeParts[1]), currentDate.getSeconds() + parseInt(timeParts[2]));
                        localStorage.setItem("deadline", deadline);

                        setTimeout(() => { this.cancelChallenge(); }, deadline.getTime() - currentDate.getTime());
                        setInterval(() => { this.deadlineTimer = new Date(deadline.getTime() - new Date().getTime()).toISOString().substr(11, 8); }, 1000);
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.errorMessage = error.response.data;
                });
        },
        cancelChallenge() {
            localStorage.removeItem("activeChallenge");
            localStorage.removeItem("deadline");
            this.activeChallenge = null;

            axios.delete('/challenge/' + this.user.userId)
                .then(response => {

                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        if (localStorage.getItem("activeChallenge") != null || localStorage.getItem("activeChallenge") != undefined || localStorage.getItem("activeChallenge") != "") {
            this.activeChallenge = JSON.parse(localStorage.getItem("activeChallenge"));
            let deadline = new Date(localStorage.getItem("deadline"));
            let currentDate = new Date();
            if (deadline) {
                setTimeout(() => { this.cancelChallenge(); }, deadline.getTime() - currentDate.getTime());
            }
        }
    }
};
</script>

<template>
    <Header></Header>

    <div class="container mt-5">
        <!-- Challenge input -->
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Enter challenge code" aria-label="Enter challenge code"
                aria-describedby="button-addon2" v-model="challengeCode">
            <button class="btn" type="button" id="button-addon2" @click="submitChallenge">Submit</button>
        </div>

        <!-- Show active challenge -->
        <div class="card" v-if="activeChallenge == null || activeChallenge == undefined || activeChallenge == ''">
            <div class="card-body">
                <h5 class="card-title">Active Challenge</h5>
                <p class="card-text">No active challenge</p>
            </div>
        </div>

        <div class="card" v-else>
            <div class="card-body">
                <h5 class="card-title text-light">{{ activeChallenge.title }}</h5>
                <hr>
                <p class="card-text">{{ activeChallenge.explanation }}</p>
                <p class="card-text">deadline: {{ deadlineTimer }}</p>
            </div>
        </div>

        <!-- Error message -->
        <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage != ''">
            {{ errorMessage }}
        </div>

    </div>
</template>

<style></style>