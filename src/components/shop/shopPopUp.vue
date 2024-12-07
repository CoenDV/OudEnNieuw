<script>
import Header from './../Header.vue';

// https://www.myinstants.com/en/categories/sound%20effects/

export default {
    name: "Shop",
    components: {
        Header
    },
    data() {
        return {
            sounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            currentSound: null
        }
    },
    methods: {
        // get random sound
        getRandomSound() {
            return this.sounds[Math.floor(Math.random() * this.sounds.length)];
        },
    },
    mounted() {
        this.currentSound = this.getRandomSound();
        //document.getElementById('myAudio').play();

        document.getElementById('intro').addEventListener('ended', myHandler, false);
        function myHandler(e) {
            // hide the intro video
            document.querySelector('#intro').style.display = 'none';
        }
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
    
    <div class="modal z-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body row justify-content-center">
                    <img :src="'./images/shop/' + item.title + '.png'" alt="shop item" class="img-fluid">
                </div>
            </div>
        </div>
    </div>

    <video id="intro" style="display: block;" class="" width="100%" height="100%" autoplay>
        <source class="z-3" src="./../../../public/audio/theHub.mp4" type="video/mp4">
    </video>
    <!-- <audio id="myAudio">
        <source src="/audio/thehub.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio> -->
</template>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.0);
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
}

.modal-dialog,
.modal-content {
    background-color: rgba(0, 0, 0, 0);

    /* https://animate.style */
    animation: jackInTheBox, lightSpeedOutRight;
    animation-duration: 2s, 1s;
    animation-delay: 3s, 19s;
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
}

#intro {
    position: relative; /* Ensure it participates in stacking context */
    z-index: 10000; /* Higher than modal's default z-index of 1050 */
}
</style>