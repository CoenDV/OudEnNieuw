<template>
    <form method="POST" class="my-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Account Info</h5>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingUsername" name="username" v-model="user.username"> <!-- add username from account -->
                    <label for="floatingUsername">Username</label>
                </div>
                <div class="form-floating py-2">
                    <input type="password" class="form-control" id="floatingPassword" name="password" v-model="user.password"> <!-- add password from account -->
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingFirstname" name="firstname" v-model="user.firstname"> <!-- add firstname from account -->
                    <label for="floatingFirstname">Firstname</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingLastname" name="lastname" v-model="user.lastname"> <!-- add lastname from account -->
                    <label for="floatingLastname">lastname</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingWeight" name="weight" v-model="user.weight"> <!-- add weight from account -->
                    <label for="floatingWeight">Weight</label>
                </div>
                <div class="form-floating py-2">
                    <input type="date" class="form-control" id="floatingDate" name="date" v-model="user.birthdate"> <!-- add birthdate from account -->
                    <label for="floatingDate">Birthdate</label>
                </div>
                <input class="w-100 btn btn-lg btn-primary my-2" type="button" name="update" value="Update Account" @click="update()">
                <input class="w-100 btn btn-lg btn-danger" value="Delete Account" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
            </div>
        </div>

        <DeleteModal />
    </form>
</template>

<script>
import DeleteModal from './DeleteModal.vue'
import axios from 'axios'

export default {
    name: "AccountForm",
    components: {
        DeleteModal
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user"))
        }
    },
    methods: {
        update() {
            axios
                .put("http://localhost/users", this.user)
                .then(response => {
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
};
</script>

<style></style>