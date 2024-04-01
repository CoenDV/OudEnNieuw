<template>
    <!-- Modal -->
    <!-- https://elevenstechwebtutorials.com/detail/7/show-dynamic-data-on-modal-popup-using-php -->
    <div class="modal fade" :id="'exampleModal' + schedule.scheduleId" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"> {{ schedule.scheduleName }} </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p> Your exercises are: </p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">muscle group</th>
                                <th scope="col">sets</th>
                                <th scope="col">reps</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="exercise in schedule.exercises">
                                <td scope="row">{{exercise.name}}</td>
                                <td>{{ exercise.muscleGroup }}</td>
                                <td>{{ exercise.sets }}</td>
                                <td>{{ exercise.reps }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <form method="POST" class="my-3">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <input type="hidden" name="schedule" :value="schedule.scheduleId">
                        <input type="button" name="update" class="btn btn-primary" value="Update Schedule" v-if="!public">
                        <input type="button" name="delete" class="btn btn-danger" value="Delete Schedule" v-if="!public" @click="deleteSchedule()">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
    name: "ScheduleItem",
    props: {
        schedule: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            public: true,
            url: this.$route.path
        }
    },
    created() {
        if (this.url === '/schedules/publicschedules') {
            this.public = true;
        } else if (this.url === '/schedules/ownschedules') {
            this.public = false;
        }
    },
    methods: {
        updateSchedule() {
            axios
            .put("/schedules/updateschedule", {
                schedule: this.schedule
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        deleteSchedule() {
            axios
            .delete("/schedules/deleteschedule/"+this.schedule.scheduleId)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
};
</script>

<style></style>