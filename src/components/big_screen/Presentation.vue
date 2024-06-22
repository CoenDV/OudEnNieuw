<script>
import axios from './../../axios-auth';
import Header from './../Header.vue';

export default {
    name: "Presentation",
    components: {
        Header,
    },
    data() {
        return {
            countdownTimer: null,
            users: [],
        }
    },
    methods: {
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
        updateCountdown() {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0); // set time to midnight

            const timeDiff = midnight - now;

            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            document.getElementById('countdown').innerHTML = `${hours}h ${minutes}m ${seconds}s`;

            if (timeDiff < 0) {
                clearInterval(this.countdownTimer);
                document.getElementById('countdown').innerHTML = 'Happy Midnight!';
            }
        }
    },
    mounted() {
        this.getUsers();

        this.updateCountdown(); // initial call to display the countdown immediately
        this.countdownTimer = setInterval(this.updateCountdown, 1000);
    },
    beforeDestroy() {
        clearInterval(this.countdownTimer);
    }
};
</script>

<template>
    <Header></Header>
    <div class="row">
        <!-- Active Boosters-->
        <div class="col-2 text-center mt-5">
            <h2 class="text-light">Active Boosters</h2>
        </div>

        <!-- Presentation-->
        <div class="col-8 mt-5">
            <!--top 1-->
            <div v-if="users[0]" class="row mt-2">
                <div class="col-2 offset-5 position-relative">
                    <img :src="'./../../../public/images/users/' + users[0].username + '.png'" alt="Quiz"
                        class="img-fluid">
                    <img src="./../../../public/images/golden-crown-emblem-with-wreath-frame.png" alt="Quiz"
                        class="position-absolute start-50 translate-middle" style="width:135%; height: 135%; margin-top: 32%">
                        <p>{{ users[0].username }} - {{ users[0].points }} points</p>
                </div>
            </div>
            <!--top 3-->
            <div v-if="users[1] && users[2]" class="row mt-2">
                <div class="col-2 offset-4">
                    <img :src="'./../../../public/images/users/' + users[1].username + '.png'" alt="Quiz"
                        class="img-fluid">
                    <p>{{ users[1].username }} - {{ users[1].points }} points</p>
                </div>
                <div class="col-2">
                    <img :src="'./../../../public/images/users/' + users[2].username + '.png'" alt="Quiz"
                        class="img-fluid">
                    <p>{{ users[2].username }} - {{ users[2].points }} points</p>
                </div>
            </div>
            <!--top 6-->
            <div v-if="users[3] && users[4] && users[5]" class="row mt-2">
                <div class="col-2 offset-3">
                    <img :src="'./../../../public/images/users/' + users[3].username + '.png'" alt="Quiz"
                        class="img-fluid">
                    <p>{{ users[3].username }} - {{ users[3].points }} points</p>
                </div>
                <div class="col-2">
                    <img :src="'./../../../public/images/users/' + users[4].username + '.png'" alt="Quiz"
                        class="img-fluid">
                    <p>{{ users[4].username }} - {{ users[4].points }} points</p>
                </div>
                <div class="col-2">
                    <img :src="'./../../../public/images/users/' + users[5].username + '.png'" alt="Quiz"
                        class="img-fluid">
                    <p>{{ users[5].username }} - {{ users[5].points }} points</p>
                </div>
            </div>
        </div>

        <!-- Countdown-->
        <div class="col-2 text-center mt-5">
            <h2 class="text-light">Countdown</h2>
            <h3 id="countdown" class="text-light">00:00</h3>
        </div>
    </div>
</template>

<style></style>