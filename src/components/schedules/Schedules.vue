<template>
    <section>
        <div class="container">
            <h1>Schedules: </h1>
            <div class="row">
                <schedule-item v-for="schedule in schedules" :key="schedule.id" :schedule="schedule" />
            </div>
        </div>
    </section>
    <Footer></Footer>
</template>

<script>
import ScheduleItem from './ScheduleItem.vue'
import Footer from './../Footer.vue'
import axios from '../../axios-auth'
import router from '../../router';

export default {
    name: "Schedules",
    components: {
        ScheduleItem,
        Footer
    },
    data() {
        return {
            schedules: [],
            public: true,
            url: this.$route.path,
            user: JSON.parse(localStorage.getItem("user"))
        }
    },
    watch: {
        '$route': 'fetchData'
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            if (this.$route.path === '/schedules/publicschedules') {
                this.public = true;
            } else if (this.$route.path === '/schedules/ownschedules') {
                this.public = false;
            }

            this.schedules = [];
            this.getSchedules();
        },
        getSchedules() {
            if (this.public) {
                this.getPublicSchedules();
            } else {
                this.getPrivateSchedules();
            }
        },
        getPublicSchedules() {
            axios
                .get("/schedules/publicschedules")
                .then((response) => {
                    this.schedules = response.data;
                    console.log(this.schedules);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getPrivateSchedules() {
            console.log(this.user);
            axios
                .get("/schedules/ownschedules/" + this.user.userId)
                .then((response) => {
                    this.schedules = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>

<style></style>