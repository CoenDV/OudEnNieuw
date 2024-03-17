<template>
    <section>
        <div class="container">
            <form method="POST" class="container-fluid col-xxl-6 col-md-6 col-sm-12 my-3">
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div class="form-floating mb-3">
                    <input type="username" class="form-control" name="username" placeholder="testUser" id="username"
                        v-model="username">
                    <label for="username">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" name="password" placeholder="Password" id="password"
                        v-model="password">
                    <label for="password">Password</label>
                </div>
                <input class="w-100 btn btn-lg btn-primary" type="button" value="sign in"
                    @click="login(username, password)">
                <p class="mt-5 text-body-secondary">Don't have an account? <a href="/register">Register</a></p>
                <p class="text-body-secondary">© Coen de Vries - 2023</p>
            </form>
        </div>
    </section>
    <Footer> </Footer>
</template>

<script>
import Footer from './../Footer.vue'
import axios from '../../axios-auth';
import router from '../../router';

export default {
    name: "Login",
    components: {
        Footer
    },
    data() {
        return {
            username: null,
            password: null,
            user: null,
            jwt: "",
        }
    },
    beforeMount() {
        if(localStorage.getItem("user") != null) {
            localStorage.removeItem("jwt")
            localStorage.removeItem("user")
        }
    },
    methods: {
        login(username, password) {
            this.user = {
                username: username,
                password: password
            }
            axios
                .get("/login", { params: this.user})
                .then(response => {
                    this.jwt = response.data.jwt;
                    this.user = response.data.user;
                    axios.defaults.headers.common['Authorization'] = "Bearer " + this.jwt;
                    
                    if(this.user != null) {
                        localStorage.setItem("jwt", this.jwt)
                        localStorage.setItem("user", JSON.stringify(this.user))
                        this.$router.push("/account")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
};
</script>

<style></style>