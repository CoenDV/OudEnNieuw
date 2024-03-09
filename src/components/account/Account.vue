<template>
    <section>
        <div class="container">
            <h1>Hey {{ user.username }}</h1>
            <h3 class="text-secondary">What will you be training today?</h3>

            <AccountForm />
        </div>
    </section>
    <Footer> </Footer>
</template>

<script>
import AccountForm from './AccountForm.vue'
import Footer from './../Footer.vue'

export default {
    name: "Account",
    components: {
        AccountForm,
        Footer
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user"))
        }
    }
};
</script>

<style></style>