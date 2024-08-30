<script>
import Header from './../Header.vue';

export default {
    name: "Shop",
    components: {
        Header
    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        document.getElementById('myAudio').play();
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>

<template>
    <img id="confetti" src="/images/confetti.gif" alt="confetti">
    <div class="modal show">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body row justify-content-center">
                    <img :src="'./images/shop/' + item.title + '.webp'" alt="shop item" style="width: 150px; height: 150px;">
                    <h1 class="modal-title text-center">{{ item.title }}</h1>
                    <p class="text-center">{{ item.explanation }}</p>
                    <p class="text-center">Points: {{ item.points }}</p>
                </div>
            </div>
        </div>
    </div>
    <audio id="myAudio">
        <source src="/audio/purchaseItem.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
</template>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.5);
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
    overflow: auto;
}

.modal-dialog,
.modal-content {
    background-color: rgba(0, 0, 0, 0);

    /* https://animate.style */
    animation: jackInTheBox, lightSpeedOutRight;
    animation-duration: 2s, 1s;
    animation-delay: 0s, 9s;
}

.modal-header {
    background-color: rgba(0, 0, 0, 0);
    color: white;
}

.modal-body {
    background-color: rgba(0, 0, 0, 0);
    color: white;
}

#confetti {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1049;
}
</style>