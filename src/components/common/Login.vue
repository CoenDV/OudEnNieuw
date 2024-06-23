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
        }
    },
    beforeMount() {
        if (localStorage.getItem("user") != null && window.location.pathname == "/") {
            localStorage.removeItem("user")

            window.location.reload()
        }
    },
    methods: {
        login(username) {
            this.store.login(username)
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
            <img src="/public/images/logo.png" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label for="Username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="Username" name="username" v-model="username">
                    </div>
                    <input type="button" class="btn col-12" value="Login" @click="login(username)" />
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