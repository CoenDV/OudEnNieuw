<script>
import { userStore } from "../../stores/store";
import router from '../../router/index.js';

export default {
    name: "Index",
    components: {
        
    },
    setup() {
        const store = userStore();
        return { store };
    },
    data() {
        return {
            user: null,
            username: "",
            password: ""
        }
    },
    beforeMount() {
        if (localStorage.getItem("user") != null && window.location.pathname == "/") {
            localStorage.removeItem("user")

            window.location.reload()
        }
    },
    methods: {
        login(username, password) {
            this.store.login(username, password)
                .then(() => {
                    router.push({ path: '/home' });
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
};
</script>

<template>

    <section class="container d-flex align-items-center justify-content-center" style="min-height: 100vh">
        <div class="card col-10 p-3">
            <img src="/images/logo.png" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label for="Username" class="form-label">Gebruikersnaam: </label>
                        <input type="text" class="form-control" id="Username" name="username" v-model="username">
                    </div>
                    <div class="mb-3">
                        <label for="Password" class="form-label">Wachtwoord: </label>
                        <input type="password" class="form-control" id="Paddword" name="password" v-model="password">
                    </div>
                    <input type="button" class="btn col-12" value="Login" @click="login(username, password)" />
                </form>
            </div>
        </div>
    </section>
</template>

<style>
.card {
    background-color: #0e0e0e;
}

label {
    color: white;
}

.btn {
    background-color: #ff9000;
    color: #000000;
}
</style>