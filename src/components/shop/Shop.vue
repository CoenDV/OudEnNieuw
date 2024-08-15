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
        }
    },
    mounted() {
        this.getShopItems();

        // get points of logged in user
        axios.get("/login/" + this.user.username + "/points")
            .then(response => {
                this.user.points = response.data;
                localStorage.setItem('user', JSON.stringify(this.user));
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
        </div>
        <div class="row mb-5">
            <ShopItem v-on:changeUser="updatePoints" v-for="item in ShopItems" :key="item.id" :item="item"></ShopItem>
        </div>
        <div class="mb-5">
            hahah dit zie je niet
        </div>
    </div>
</template>

<style></style>