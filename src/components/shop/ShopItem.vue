<script>

export default {
    name: "ShopItem",
    methods: {
        buyItem() {
            alert("bought item");
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
    <div class="container col-5" :data-bs-target="'exampleModal' + item.itemId">
        <img :src="'./images/' + item.title + '.png'" alt="shop item" style="width: 150px; height: 150px;">
        <h3> {{ item.title }} </h3>
        <button type="button" class="btn" data-bs-toggle="modal" :data-bs-target="'#exampleModal'+item.itemId">
            Buy for {{ item.points }}
        </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="'exampleModal'+item.itemId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ item.title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Description: {{ item.explanation }}
                    Points: {{ item.points }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn">Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
h3,
p {
    color: #ffffff;
}
</style>