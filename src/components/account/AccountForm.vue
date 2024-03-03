<template>
    <form method="POST" class="my-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Account Info</h5>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingUsername" name="username" value=""> <!-- add username from account -->
                    <label for="floatingUsername">Username</label>
                </div>
                <div class="form-floating py-2">
                    <input type="password" class="form-control" id="floatingPassword" name="password" value=""> <!-- add password from account -->
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingFirstname" name="firstname" value=""> <!-- add firstname from account -->
                    <label for="floatingFirstname">Firstname</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingLastname" name="lastname" value=""> <!-- add lastname from account -->
                    <label for="floatingLastname">lastname</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingWeight" name="weight" value=""> <!-- add weight from account -->
                    <label for="floatingWeight">Weight</label>
                </div>
                <div class="form-floating py-2">
                    <input type="date" class="form-control" id="floatingDate" name="date" value=""> <!-- add birthdate from account -->
                    <label for="floatingDate">Birthdate</label>
                </div>
                <input class="w-100 btn btn-lg btn-primary my-2" type="submit" name="update" value="Update Account">
                <input class="w-100 btn btn-lg btn-danger" value="Delete Account" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
            </div>
        </div>

        <DeleteModal />
    </form>
</template>

<script>
import DeleteModal from './DeleteModal.vue'

export default {
    name: "AccountForm",
    components: {
        DeleteModal
    }
};
</script>

<style></style>