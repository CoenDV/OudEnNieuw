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
            rank: 0,
            imageUrl: './images/users/' + JSON.parse(localStorage.getItem("user")).username + '.png',
        }
    },
    mounted() {
        this.getPoints();

        this.stompClient = new StompJs.Client({
            brokerURL: this.$webSocketLink + 'gs-guide-websocket'
        });

        this.stompClient.onConnect = (frame) => {
            console.log("Connected: " + frame);
            this.stompClient.subscribe('/topic/quiz-mainscreen', (result) => {
                const Response = JSON.parse(result.body);
                console.log("Received: " + JSON.stringify(Response));
                this.getPoints();

                if (Response == "update points") {
                    this.getPoints();
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
    methods: {
        getPoints() {
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
        imageUrlAlt(event) {
            event.target.src = './images/users/profilePicture.png'
        }
    },
    beforeCreate() {
        if (localStorage.getItem("user") == null)
            window.location.href = "/";
        this.user = JSON.parse(localStorage.getItem("user"));
    },
    beforeUnmount() {
        this.stompClient.deactivate();
    },
    beforeDestroy() {
        this.stompClient.deactivate();
    }
};
</script>

<template>
    <Header></Header>
    <div class="container d-flex row justify-content-center">
        <!-- profile pic -->
        <div class="col-12 d-flex justify-content-center my-2">
            <img :src="this.imageUrl" @error="imageUrlAlt" alt="profile picture"
                style="width: 200px; height: 200px;">
        </div>

        <!-- name -->
        <div class="col-12 d-flex justify-content-center my-2">
            <h1 style="color:#ff9000;">{{ rank }}. {{ user.username }} </h1>
        </div>

        <!-- points -->
        <div class="col-12 d-flex justify-content-center my-2">
            <h2> Points: {{ user.points }}</h2>
        </div>

        <!-- correct answers -->
        <div class="col-12 d-flex justify-content-center">
            <h3> Goede antwoorden: {{ user.correctAnswers }}</h3>
        </div>
        <!-- items bought -->
        <div class="col-12 d-flex justify-content-center">
            <h3> Aantal Aankopen: {{ user.itemsBought }}</h3>
        </div>
        <!-- Total gathered points -->
        <div class="col-12 d-flex justify-content-center">
            <h3> Totaal aantal punten: {{ user.totalPoints }}</h3>
        </div>
    </div>
</template>

<style scoped>
h1,
h2 {
    color: #ffffff;
}
</style>