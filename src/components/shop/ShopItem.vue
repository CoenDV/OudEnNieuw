<script>
import axios from '../../axios-auth';


export default {
    name: "ShopItem",
    methods: {
        buyItem(item) {
            const user = JSON.parse(localStorage.getItem('user'))

            if (user.points < item.points) {
                this.message = 'You do not have enough points to buy this item!'
                return
            }

            axios.post('/shop/buy', {
                itemId: item.itemId,
                userId: user.userId
            })
                .then(response => {
                    this.message = 'Item bought successfully!'
                    localStorage.setItem('user', JSON.stringify(response.data))
                    this.$emit('changeUser')
                })
                .catch(error => {
                    console.log(error);
                });
        },
        changeColor() {
            if (this.message === 'Item bought successfully!')
                return 'good'
            else
                return 'bad'
        }
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            message: '',
        }
    }
};
</script>

<template>
    <div class="container col-5 mb-1" :data-bs-target="'exampleModal' + item.itemId">
        <img :src="'/images/shop/' + item.title + '.webp'" alt="shop item" style="width: 120px; height: 120px;">
        <h3> {{ item.title }} </h3>
        <button type="button" class="btn" data-bs-toggle="modal" :data-bs-target="'#exampleModal' + item.itemId">
            Buy for {{ item.points }}
        </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="'exampleModal' + item.itemId" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header ">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ item.title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ item.explanation }}
                    <br>
                    Points: {{ item.points }}
                    <br>
                    <h3 :class="changeColor()">{{ message }}</h3>
                </div>
                <div class="modal-footer ">
                    <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn" @click="buyItem(item)">Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
h1,
h3,
.modal,
p {
    color: #ffffff;
}

.modal-header,
.modal-footer {
    background-color: #0e0e0e;
}

.modal-body {
    background-color: #000000;
}

.good {
    color: #26890C;
}

.bad {
    color: #FFA500;
}
</style>