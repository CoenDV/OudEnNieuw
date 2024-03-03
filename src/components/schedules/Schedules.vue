<template>
    <section>
        <div class="container">
            <h1>Schedules: </h1>
            <schedule-item v-for="schedule in schedules" :key="schedule.id" :schedule="schedule" />
        </div>
    </section>
    <Footer />
</template>

<script>
import ScheduleItem from './ScheduleItem.vue'
import Footer from './../Footer.vue'

export default {
    name: "Schedules",
    components: {
        ScheduleItem,
        Footer
    }
};
</script>

<style></style>