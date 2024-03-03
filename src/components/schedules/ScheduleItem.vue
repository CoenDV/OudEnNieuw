<template>
    <div class="card col-xxl-3 col-md-5 col-sm-12 m-2">
        <div class="card-header">
            <h5 class="card-title"></h5> <!-- add schedule name -->
            <h6 class="card-subtitle mb-2 text-body-secondary"></h6> <!-- add created by from session data -->
        </div>
        <div class="card-body">
            <p class="card-text"></p> <!-- add description -->
            <p class="card-text"></p> <!-- add Nr of exercises -->
            <p class="card-text"></p> <!-- add date created -->
            <p class="card-text"></p> <!-- if public -->
            <p class="card-text"></p> <!-- else private -->
            <button id="modalButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal"> Open Schedule </button> <!-- add unique ID -->
        </div>
    </div>
    <ScheduleItemModal />
</template>

<script>
import ScheduleItemModal from './ScheduleItemModal.vue'

export default {
    name: "ScheduleItem",
    components: {
        ScheduleItemModal
    }
};
</script>

<style></style>