import { defineStore } from 'pinia'
import axios from '../axios-auth'

export const userStore = defineStore('store', {
    state: () => ({
        jwt: '',
        user: ''
    }),
    getters: {
        isLoggedIn: (state) => state.jwt !== '',
    },
    actions: {
        login(username, password) {
            return new Promise((resolve, reject) => {
                this.user = {
                    username: username,
                    password: password
                }
                axios
                    .get("/login", { params: this.user })
                    .then(response => {
                        this.jwt = response.data.jwt;
                        this.user = response.data.user;
                        axios.defaults.headers.common['Authorization'] = "Bearer " + this.jwt;
                        resolve();

                        if (this.user != null) {
                            localStorage.setItem("jwt", this.jwt)
                            localStorage.setItem("user", JSON.stringify(this.user))
                        }
                    })
                    .catch((error) => reject(error));
            }
            )
        },
        autoLogin() {
            const jwt = localStorage.getItem("jwt")
            const user = localStorage.getItem("user")

            if (jwt && user) {
                this.jwt = jwt
                this.user = JSON.parse(user)
                axios.defaults.headers.common['Authorization'] = "Bearer " + this.jwt
            }
        }
    },
}
)