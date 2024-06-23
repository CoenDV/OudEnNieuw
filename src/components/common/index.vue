<script>
import Header from './../Header.vue';

export default {
    name: "Index",
    components: {
        Header,
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user"))
        }
    },
    beforeCreate() {
        if (localStorage.getItem("user") == null) {
            window.location.href = "/"
        }
    }
};
</script>

<template>
    <Header></Header>
    <div class="container d-flex row justify-content-center">
        <!-- profile pic -->
        <div class="col-12 d-flex justify-content-center my-2">
            <img :src="'/public/images//users/' + user.username + '.png'" alt="profile picture"
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
    </div>
</template>

<style scoped>
h1,
h2 {
    color: #ffffff;
}
</style>