<template>
    <section>
        <div class="container">
            <h1>Create a Schedule: </h1>
            <div class="container row">
                <div class="col-xxl-12">
                    <CreateScheduleAccordion :map="this.map"/>
                </div>
            </div>
        </div>
    </section>
    <Footer></Footer>
</template>

<script>
import CreateScheduleAccordion from './CreateScheduleAccordion.vue'
import ScheduleForm from './ScheduleForm.vue'
import Footer from './../Footer.vue'

import axios from '../../axios-auth'

export default {
    name: "CreateSchedule",
    components: {
        CreateScheduleAccordion,
        ScheduleForm,
        Footer
    },
    methods: {
        addItem: function (exercise) {
            // add exercise to schedule
        },
        sendForm: async function () {
            // send schedule to backend
        },
    },
    data() {
        return {
            map: []
        };
    },
    created() {
        this.getExercises();
    },
    methods: {
        getExercises() {
            axios
                .get("/exercises/getAll")
                .then((response) => {
                    this.map = response.data;
                    console.log(this.map);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
};
</script>

<style></style>