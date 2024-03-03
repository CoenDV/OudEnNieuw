<template>
    <form id="scheduleForm">
        <h3 class="text-center col-xxl-9">Schedule Name: </h3>
        <input type="text" class="form-control" id="scheduleName" placeholder="Schedule Name" required>
        <input type="text" class="form-control" id="description" placeholder="Description" required>
        <input type="checkbox" class="form-check-input" id="public" value="public schedule">
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
        <input type="button" value="Create Schedule" class="btn btn-primary float-end" onclick="sendForm()">
    </form>
</template>

<script>
export default {
    name: "ScheduleForm",
};
</script>

<style></style>