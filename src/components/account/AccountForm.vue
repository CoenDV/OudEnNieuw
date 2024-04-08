<template>
    <form method="POST" class="my-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Account Info</h5>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingUsername" name="username"
                        v-model="user.username">
                    <label for="floatingUsername">Username</label>
                </div>
                <div class="form-floating py-2">
                    <input type="password" class="form-control" id="floatingPassword" name="password"
                        v-model="user.password">
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingFirstname" name="firstname"
                        v-model="user.firstname">
                    <label for="floatingFirstname">Firstname</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingLastname" name="lastname"
                        v-model="user.lastname">
                    <label for="floatingLastname">lastname</label>
                </div>
                <div class="form-floating py-2">
                    <input type="text" class="form-control" id="floatingWeight" name="weight" v-model="user.weight">
                    <label for="floatingWeight">Weight</label>
                </div>
                <div class="form-floating py-2">
                    <input type="date" class="form-control" id="floatingDate" name="date" v-model="user.birthdate">
                    <label for="floatingDate">Birthdate</label>
                </div>
                <input class="w-100 btn btn-lg btn-primary my-2" type="button" name="update" value="Update Account"
                    @click="update()" data-bs-toggle="modal" data-bs-target="#modalUpdate">
                <input class="w-100 btn btn-lg btn-danger" value="Delete Account" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
            </div>
        </div>

        <div class="modal fade" id="modalUpdate" tabindex="-1" aria-labelledby="modalUpdateLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalUpdateLabel">Updated!</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>You have updated your account!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <DeleteModal />
    </form>
</template>

<script>
import DeleteModal from './DeleteModal.vue'
import axios from '../../axios-auth';

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
                .put("/users", this.user)
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