<template>
    <div class="row">
        <div class="accordion col-6" id="accordionExample">
            <form>
                <!-- set iterator on 0-->
                <!-- foreach musclegroup-->
                <div class="accordion-item" v-for="muscleGroup in map">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse" aria-expanded="true" aria-controls="collapse">{{ }}</button>
                        <!-- data-bs-target unique ID, aria-controls unique ID, add musclegroup name -->
                    </h2>
                    <div id="collapse" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <!-- id unique ID -->
                        <div class="accordion-body">
                            <div class="form-check" v-for="exercise in muscleGroup">
                                <input class="form-check-input" @click="addItem($event)" type="checkbox"
                                    :value="exercise.exerciseId" :id="'flexCheckDefault' + exercise.exerciseId">
                                <label class="form-check-label" :for="'flexCheckDefault' + exercise.exerciseId"
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
            <input type="text" class="form-control" id="scheduleName" placeholder="Schedule Name" v-model="scheduleName"
                required>
            <input type="text" class="form-control" id="description" placeholder="Description" v-model="description"
                required>
            <input type="checkbox" class="form-check-input" id="public" value="public schedule" v-model="public">
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
            <input type="button" value="Create Schedule" class="btn btn-primary float-end" @click="sendForm()">
        </form>
    </div>
</template>

<script>
import axios from '../../axios-auth'
import router from '../../router';

export default {
    name: "CreateScheduleAccordion",
    props: {
        map: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            muscleGroups: ["chest", "back", "legs", "arms", "shoulders", "abs"],
            usedExercises: [],
            scheduleName: "",
            description: "",
            public: false
        }
    },
    methods: {
        addItem(event) {
            const element = event.target;
            const table = document.getElementById("tableBody");
            const content = document.getElementById("label" + element.value);

            if (this.usedExercises.includes(element.value)) {
                this.usedExercises = this.usedExercises.filter(e => e !== element.value);
                document.getElementById("table").deleteRow(document.getElementById("table").rows.namedItem("row" + element.value).rowIndex);
            }
            else {
                const row = document.createElement("tr");
                row.id = "row" + element.value;

                const cellExercise = document.createElement("td");
                cellExercise.textContent = content.textContent;

                const cellSets = document.createElement("td");
                const setsInput = document.createElement("input");
                setsInput.id = "sets" + element.value;
                setsInput.type = "number";
                setsInput.value = 1;
                setsInput.min = 1;
                cellSets.appendChild(setsInput);

                const cellReps = document.createElement("td");
                const repsInput = document.createElement("input");
                repsInput.id = "reps" + element.value;
                repsInput.type = "number";
                repsInput.value = 1;
                repsInput.min = 1;
                cellReps.appendChild(repsInput);


                row.appendChild(cellExercise);
                row.appendChild(cellSets);
                row.appendChild(cellReps);
                table.appendChild(row);
                this.usedExercises.push(element.value);
            }
        },
        sendForm() {
            let thispublic;
            if (this.public === true) {
                thispublic = 1;
            }
            else {
                thispublic = 0;
            }

            let schedule = {
                scheduleName: this.scheduleName,
                description: this.description,
                public: thispublic,
                exercises: [],
                userId: JSON.parse(localStorage.getItem("user")).userId
            };
            this.usedExercises.forEach(exercise => {
                const sets = document.getElementById("sets" + exercise).value;
                const reps = document.getElementById("reps" + exercise).value;

                schedule.exercises.push({
                    exerciseId: exercise,
                    sets: sets,
                    reps: reps
                });
            });

            console.log(schedule);

            axios
                .post("/schedules/createschedule", schedule)
                .then((response) => {
                    console.log(response);
                    this.$router.push('/schedules/ownschedules')
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>

<style></style>