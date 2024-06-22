<script>
import Header from './../Header.vue';

export default {
    name: "Quiz",
    components: {
        Header,
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        sendAnswer(buttonColor) {
            alert("clicked " + buttonColor);
        }
    }
};
</script>

<template>
    <Header></Header>
    
    <div v-if="!isActive" class="container-fluid mx-1 mt-5">
        <h1 class="text-center text-light">No Quiz active at the moment...</h1>
    </div>

    <div v-else class="container-fluid mx-1 mt-5">
        <img src="/public/images/buttonRed.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
            @click="sendAnswer('red')">
        <img src="/public/images/buttonBlue.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
            @click="sendAnswer('blue')">
        <img src="/public/images/buttonYellow.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
            @click="sendAnswer('yellow')">
        <img src="/public/images/buttonGreen.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
            @click="sendAnswer('green')">
    </div>
</template>

<style></style>