<template>
    <div class="accordion" id="accordionExample">
        <form>
            <!-- set iterator on 0-->
            <!-- foreach musclegroup-->
            <div class="accordion-item ">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse" aria-expanded="true" aria-controls="collapse"></button>
                    <!-- data-bs-target unique ID, aria-controls unique ID, add musclegroup name -->
                </h2>
                <div id="collapse" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <!-- id unique ID -->
                    <div class="accordion-body">
                        <!-- foreach exercise in musclegroup -->
                        <div class="form-check">
                            <input class="form-check-input" onclick="addItem(this)" type="checkbox" value=""
                                id="flexCheckDefault"> <!-- value exerciseID, id unique ID-->
                            <label class="form-check-label" for="flexCheckDefault" id="label">
                                <!-- for exerciseID, if unique ID -->
                                <!-- add exercise name -->
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- +1 iterator -->
        </form>
    </div>
</template>

<script>
export default {
    name: "CreateScheduleAccordion",
};
</script>

<style></style>