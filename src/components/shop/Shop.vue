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
            ShopItems: []
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
    <div class="container my-5">
        <div class="row">
            <ShopItem v-for="item in ShopItems" :key="item.id" :item="item"></ShopItem>
        </div>
    </div>
</template>

<style></style>