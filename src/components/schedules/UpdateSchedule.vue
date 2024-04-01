<template>
    <section>
        <div class="container">
            <h1>Update your Schedule: </h1>
            <div class="container row">
                <div class="row">
                    <div class="accordion col-6" id="accordionExample">
                        <form>
                            <!-- set iterator on 0-->
                            <!-- foreach musclegroup-->
                            <div class="accordion-item" v-for="muscleGroup in map">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapse" aria-expanded="true" aria-controls="collapse"></button>
                                    <!-- data-bs-target unique ID, aria-controls unique ID, add musclegroup name -->
                                </h2>
                                <div id="collapse" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample">
                                    <!-- id unique ID -->
                                    <div class="accordion-body">
                                        <div class="form-check" v-for="exercise in muscleGroup">
                                            <input class="form-check-input" @click="addItem($event)" type="checkbox"
                                                :value="exercise.exerciseId"
                                                :id="'flexCheckDefault' + exercise.exerciseId">
                                            <label class="form-check-label"
                                                :for="'flexCheckDefault' + exercise.exerciseId"
                                                v-bind:id="'label' + exercise.exerciseId">
                                                {{ exercise.name }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <form id="scheduleForm" class="col-6">
                        <h3 class="text-center col-xxl-9">Schedule Name: </h3>
                        <input type="text" class="form-control" id="scheduleName" placeholder="Schedule Name"
                            v-model="scheduleName" required>
                        <input type="text" class="form-control" id="description" placeholder="Description"
                            v-model="description" required>
                        <input type="checkbox" class="form-check-input" id="public" value="public schedule"
                            v-model="public">
                        <label class="form-check-label" for="public">Public</label>

                        <table id="table" class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Exercise</th>
                                    <th scope="col">Sets</th>
                                    <th scope="col">Reps</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">

                            </tbody>
                        </table>
                        <input type="button" value="Create Schedule" class="btn btn-primary float-end"
                            @click="sendForm()">
                    </form>
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
    name: "UpdateSchedule",
    components: {
        CreateScheduleAccordion,
        ScheduleForm,
        Footer
    },
    data() {
        return {
            map: [],
            currentSchedule: [],
            scheduleName: "",
            description: "",
            public: false
        };
    },
    mounted() {
        this.getExercises();
        this.currentSchedule = localStorage.getItem("schedule");
        this.scheduleName = this.currentSchedule.scheduleName;
        this.description = this.currentSchedule.description;
        this.public = this.currentSchedule.public;
        console.log(this.currentSchedule);
    },
    methods: {
        getExercises() {
            axios
                .get("/exercises/getAll")
                .then((response) => {
                    this.map = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
};
</script>

<style></style>