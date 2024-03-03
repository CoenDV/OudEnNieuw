<template>
    <section>
        <div class="container">
            <h1>Hey</h1> <!-- add username from session data -->
            <h3 class="text-secondary">What will you be training today?</h3>

            <AccountForm />
        </div>
    </section>
    <Footer />
</template>

<script>
import AccountForm from './AccountForm.vue'
import Footer from './../Footer.vue'

export default {
    name: "Account",
    components: {
        AccountForm,
        Footer
    }
};
</script>

<style></style>