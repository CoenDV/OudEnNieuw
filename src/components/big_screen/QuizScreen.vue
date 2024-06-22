<script>
import Header from './../Header.vue';

export default {
    name: "QuizScreen",
    components: {
        Header,
    },
    data() {
        return {
            question: 'Wat is de snelheid van sperma als een man klaar komt?',

            answers: [
                '20 km/h',
                '45 km/h',
                '35 km/h',
                '50 km/h'
            ]
        }
    },
    methods: {

    }
};
</script>

<template>
    <Header></Header>

    <div class="container mt-5">
        <div class="row mt-5">
            <div class="col-12 mt-5 d-flex justify-content-center">
                <h1 class="text-light">{{ question }}</h1>
            </div>
        </div>

        <div class="row mt-5 d-flex justify-content-center">
            <div class="col-5 position-relative">
                <img src="./../../../public/images/quizDesktop/redButton.png" alt="Red Button" class="img-fluid">
                <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[0] }}</h2>
            </div>
            <div class="col-5 position-relative">
                <img src="./../../../public/images/quizDesktop/blueButton.png" alt="Red Button" class="img-fluid">
                <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[1] }}</h2>
            </div>
        </div>
        <div class="row d-flex justify-content-center mt-4">
            <div class="col-5 position-relative">
                <img src="./../../../public/images/quizDesktop/yellowButton.png" alt="Red Button" class="img-fluid">
                <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[2] }}</h2>
            </div>
            <div class="col-5 position-relative">
                <img src="./../../../public/images/quizDesktop/greenButton.png" alt="Red Button" class="img-fluid">
                <h2 class="text-light position-absolute top-50 start-50 translate-middle">{{ answers[3] }}</h2>
            </div>
        </div>
    </div>
</template>

<style></style>