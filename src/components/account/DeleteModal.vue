<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>You are about to delete your account. Are you sure?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <input class="btn btn-danger" type="button" name="delete" value="Delete Account"
                        @click="deleteUser(this.user)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "DeleteModal",
    data() {
        return {
            userId: JSON.parse(localStorage.getItem("user")).userId
        }
    },
    methods: {
        deleteUser(user) {
            axios
                .delete("http://localhost/users/" + this.userId)
                .then(response => {
                    console.log(response.data)
                    localStorage.removeItem("user")
                    this.$router.push("/home")
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
};
</script>

<style></style>