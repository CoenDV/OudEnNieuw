<template>
    <section>
        <div class="container">
            <form method="POST" class="container-fluid col-xxl-6 col-md-6 col-sm-12 my-3">
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div class="form-floating mb-3">
                    <input type="username" class="form-control" id="floatingInput" name="username"
                        placeholder="testUser">
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" name="password"
                        placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <input class="w-100 btn btn-lg btn-primary" type="submit" value="Sign In">
                <p class="mt-5 text-body-secondary">Don't have an account? <a href="/register">Register</a></p>
                <p class="text-body-secondary">© Coen de Vries - 2023</p>
            </form>
        </div>
    </section>
    <Footer />
</template>

<script>
import Footer from './../Footer.vue'

export default {
    name: "Login",
    components: {
        Footer
    }
};
</script>

<style></style>