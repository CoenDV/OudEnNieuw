<script>
import Header from './../Header.vue';

export default {
    name: "Quiz",
    components: {
        Header,
    },
    props: {
        answers: Array,
        userId: Number,
    },
    methods: {
        sendAnswer(answerIndex) {
            if (this.isAnwsered)
                alert("You already answered this question!");
            else {
                const body = {
                    userId: this.userId,
                    answer: this.answers[answerIndex]
                };
                this.stompClient.publish({
                    destination: '/app/hello',
                    body: JSON.stringify(body)
                });
                this.isAnwsered = true;
            }
        }
    },
}
</script>

<template>
        <img v-if="answers[0]" src="/images/buttonRed.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
            @click="sendAnswer(0)">
        <img v-if="answers[1]" src="/images/buttonBlue.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
            @click="sendAnswer(1)">
        <img v-if="answers[2]" src="/images/buttonYellow.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
            @click="sendAnswer(2)">
        <img v-if="answers[3]" src="/images/buttonGreen.png" alt="quiz" class="m-1" style="width: 47%; height: 47%;"
            @click="sendAnswer(3)">
        <h1 v-else class="text-center text-light mt-3">Waiting for next Question</h1>
</template>

<style></style>