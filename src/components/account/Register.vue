<template>
    <section>
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Account Info</h5>
                    <form method="POST" class="my-3">
                        <div class="form-floating py-2">
                            <input type="text" class="form-control" id="floatingInput" name="username" value=""
                                required>
                            <label for="floatingInput">Username</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="password" class="form-control" id="floatingPassword" name="password" value=""
                                required>
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="text" class="form-control" id="floatingInput" name="firstname" value=""
                                required>
                            <label for="floatingInput">Firstname</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="text" class="form-control" id="floatingInput" name="lastname" value=""
                                required>
                            <label for="floatingInput">lastname</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="text" class="form-control" id="floatingInput" name="weight" value="" required>
                            <label for="floatingInput">Weight</label>
                        </div>
                        <div class="form-floating py-2">
                            <input type="date" class="form-control" id="floatingInput" name="date" value="" required>
                            <label for="floatingInput">Birthdate</label>
                        </div>
                        <input class="w-100 btn btn-lg btn-primary" type="submit" name="insert" value="Create Account">
                    </form>
                </div>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script>

import Footer from './../Footer.vue'

export default {
    name: "Register",
    components: {
        Footer
    }
};
</script>

<style></style>