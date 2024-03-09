<template>
    <section>
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Account Info</h5>
                    <form method="POST" class="my-3">
                        <div class="form-floating py-2">
                            <input type="text" class="form-control" id="username" name="username" v-model="username"
                                required>
                            <label for="username">Username</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="password" class="form-control" id="password" name="password" v-model="password"
                                required>
                            <label for="password">Password</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="text" class="form-control" id="firstname" name="firstname" v-model="firstname"
                                required>
                            <label for="firstname">Firstname</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="text" class="form-control" id="lastname" name="lastname" v-model="lastname"
                                required>
                            <label for="lastname">lastname</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="text" class="form-control" id="weight" name="weight" v-model="weight" required>
                            <label for="weight">Weight</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="date" class="form-control" id="date" name="date" v-model="date" required>
                            <label for="date">Birthdate</label>
                        </div>
                        <input class="w-100 btn btn-lg btn-primary" type="button" value="Create Account" @click="register()">
                    </form>
                </div>
            </div>
        </div>
    </section>
    <Footer> </Footer>
</template>

<script>

import Footer from './../Footer.vue'
import axios from 'axios'

export default {
    name: "Register",
    components: {
        Footer
    },
    data() {
        return {
            username: null,
            password: null,
            firstname: null,
            lastname: null,
            weight: null,
            date: null,
            user: null
        }
    },
    methods: {
        register() {
            console.log(this.username + " " + this.password + " " + this.firstname + " " + this.lastname + " " + this.weight + " " + this.date)
            this.user = {
                username: this.username,
                password: this.password,
                firstname: this.firstname,
                lastname: this.lastname,
                weight: this.weight,
                birthdate: this.date
            }
            axios
                .post("http://localhost/users", this.user)
                .then(response => {
                    console.log(response.data)
                    this.$router.push("/")
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
};
</script>

<style></style>