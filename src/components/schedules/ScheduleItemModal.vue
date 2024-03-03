<template>
    <!-- Modal -->
    <!-- https://elevenstechwebtutorials.com/detail/7/show-dynamic-data-on-modal-popup-using-php -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <!-- add unique ID -->
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"> </h1> <!-- add schedule name -->
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
                            <!-- foreach exercise -->
                            <tr>
                                <td scope="row"></td> <!-- add exercise name -->
                                <td></td> <!-- add muscle group -->
                                <td></td> <!-- add sets -->
                                <td></td> <!-- add reps -->
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <form method="POST" class="my-3">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <input type="hidden" name="schedule" value=""> <!-- add schedule ID -->
                        <!-- if on private schedules page -->
                        <input type="submit" name="update" class="btn btn-primary" value="Update Schedule">
                        <input type="submit" name="delete" class="btn btn-danger" value="Delete Schedule">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ScheduleItem"
};
</script>

<style></style>