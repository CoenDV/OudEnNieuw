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
    <div class="container col-12 mb-2 " :data-bs-target="'exampleModal' + item.itemId">
        <span type="button" class="" data-bs-toggle="modal" :data-bs-target="'#exampleModal' + item.itemId">
            <img :src="'/images/shop/' + item.title + '.png'" alt="shop item" class="img-fluid">
        </span>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="'exampleModal' + item.itemId" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-transparent">
                <img :src="'/images/shop/' + item.title + '.png'" alt="shop item" class="img-fluid">
                <h3 class="p-1 rounded" :class="changeColor()" style="background-color: #0e0e0e;">{{ message }}</h3>
                <div class="modal-footer bg-transparent border-0 justify-content-center">
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