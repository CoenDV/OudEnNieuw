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
            points: JSON.parse(localStorage.getItem('user')).points
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
        }
    },
    mounted() {
        this.getShopItems();
    }
};
</script>

<template>
    <Header></Header>
    <div class="container">'
        <div class="row mb-5">
            <h1 class="text-light d-flex justify-content-center">Points: {{ points }}</h1>
        </div>
        <div class="row">
            <ShopItem v-for="item in ShopItems" :key="item.id" :item="item"></ShopItem>
        </div>
    </div>
</template>

<style></style>