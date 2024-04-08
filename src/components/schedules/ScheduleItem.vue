<template>
    <div class="card col-xxl-3 col-md-5 col-sm-12 m-2">
        <div class="card-header">
            <h5 class="card-title">{{ schedule.scheduleName }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">By {{ schedule.user }}</h6>
        </div>
        <div class="card-body">
            <p class="card-text">{{ schedule.description }}</p>
            <p class="card-text">Nr Of Exercises: {{ nrOfExercises }}</p>
            <p class="card-text">Date Created: {{ schedule.dateCreated }}</p>
            <p class="card-text" v-if="schedule.public">Public: True </p>
            <p class="card-text" v-else>Public: False</p>
            <button id="modalButton" type="button" class="btn btn-primary" data-bs-toggle="modal"
                :data-bs-target="'#exampleModal' + schedule.scheduleId"> Open Schedule </button>
            <ScheduleItemModal :schedule="schedule" />
        </div>
    </div>
</template>

<script>
import ScheduleItemModal from './ScheduleItemModal.vue'

export default {
    name: "ScheduleItem",
    components: {
        ScheduleItemModal
    },
    props: {
        schedule: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user"))
        }
    },
    computed: {
        nrOfExercises() {
            return this.schedule.exercises.length;
        }
    }
};
</script>

<style></style>