<script>
import Header from './../Header.vue';
import axios from './../../axios-auth';

export default {
    name: "Index",
    components: {
        Header,
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user")),
            rank: 0
        }
    },
    mounted() {
        // get points of logged in user
        axios.get("/login/" + this.user.username + "/points")
            .then(response => {
                const Response = response.data;
                this.user.points = Response.points;
                this.rank = Response.rank;
            })
            .catch(error => {
                console.log(error);
            });
    },
    beforeCreate() {
        if (localStorage.getItem("user") == null)
            window.location.href = "/";
        this.user = JSON.parse(localStorage.getItem("user"));
    }
};
</script>

<template>
    <Header></Header>
    <div class="container d-flex row justify-content-center">
        <!-- profile pic -->
        <div class="col-12 d-flex justify-content-center my-2">
            <img :src="'./images/users/' + user.username + '.png'" alt="profile picture"
                style="width: 200px; height: 200px;">
        </div>

        <!-- name -->
        <div class="col-12 d-flex justify-content-center my-2">
            <h1> {{ user.username }} </h1>
        </div>

        <!-- points -->
        <div class="col-12 d-flex justify-content-center my-2">
            <h2> Points: {{ user.points }}</h2>
        </div>

        <!-- rank -->
        <div class="col-12 d-flex justify-content-center my-2">
            <h2> Rank: {{ rank }}</h2>
        </div>
    </div>
</template>

<style scoped>
h1,
h2 {
    color: #ffffff;
}
</style>