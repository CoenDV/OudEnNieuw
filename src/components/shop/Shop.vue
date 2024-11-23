<script>
import axios from '../../axios-auth';
import Header from './../Header.vue';
import ShopItem from './ShopItem.vue';

export default {
    name: "Shop",
    components: {
        Header,
        ShopItem
    },
    data() {
        return {
            ShopItems: [],
            user: JSON.parse(localStorage.getItem('user')),
            shopTimeout: JSON.parse(localStorage.getItem("shopTimeout")),
            boughtItem: null,
            deadlineTimer: ''
        }
    },
    methods: {
        getShopItems() {
            axios.get('/shop')
                .then(response => {
                    this.ShopItems = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        updatePoints() {
            this.user = JSON.parse(localStorage.getItem('user'));
        },
        setShopTimeout() {
            console.log("setting shop timeout");
            this.shopTimeout = JSON.parse(localStorage.getItem("shopTimeout"));

            // Get the current date
            let currentDate = new Date();

            // add the time to the current date
            let deadline = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes() + 5, currentDate.getSeconds());
            localStorage.setItem("deadline", deadline);
            localStorage.setItem("shopTimeout", true);
            this.shopTimeout = true;

            setTimeout(() => { this.cancelTimeout(); }, deadline.getTime() - currentDate.getTime());
            setInterval(() => { this.deadlineTimer = new Date(deadline.getTime() - new Date().getTime()).toISOString().substr(11, 8); }, 1000);
        },
        cancelTimeout() {
            localStorage.removeItem("shopTimeout");
            localStorage.removeItem("deadline");
            this.shopTimeout = false;
        }
    },
    mounted() {
        this.getShopItems();

        this.shopTimeout = JSON.parse(localStorage.getItem("shopTimeout"));
        let deadline = new Date(localStorage.getItem("deadline"));
        let currentDate = new Date();
        if (deadline) {
            setTimeout(() => { this.cancelTimeout(); }, deadline.getTime() - currentDate.getTime());
            setInterval(() => { this.deadlineTimer = new Date(deadline.getTime() - new Date().getTime()).toISOString().substr(11, 8); }, 1000);
        }

        // get points of logged in user
        axios.get("/login/" + this.user.username + "/points")
            .then(response => {
                const Response = response.data;
                this.user.points = Response.points;
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>

<template>
    <Header></Header>
    <div class="container">'
        <div class="row mb-2">
            <h1 class="text-light d-flex justify-content-center">Points: {{ user.points }}</h1>
            <div v-if="shopTimeout" class="">
                <h1 class="text-light d-flex justify-content-center">Timeout: {{ deadlineTimer }}</h1>
            </div>
        </div>
        <div class="row mb-5">
            <ShopItem v-on:changeUser="updatePoints" v-on:setShopTimeout="setShopTimeout" v-for="item in ShopItems"
                :key="item.id" :item="item" :shopTimeout="shopTimeout">
            </ShopItem>
        </div>
        <div class="mb-5">
            haha dit zie je niet
        </div>
    </div>
</template>

<style></style>