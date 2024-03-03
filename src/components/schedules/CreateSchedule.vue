<template>
    <section>
        <div class="container">
            <h1>Create a Schedule: </h1>
            <div class="container row">
                <div class="col-xxl-6">
                    <CreateScheduleAccordion />
                </div>
                <div class="col-xxl-6">
                    <ScheduleForm />
                </div>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script>
import CreateScheduleAccordion from './CreateScheduleAccordion.vue'
import ScheduleForm from './ScheduleForm.vue'
import Footer from './../Footer.vue'

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
            exercises: [],
        };
    },
};
</script>

<style></style>