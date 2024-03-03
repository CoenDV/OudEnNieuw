<template>
  <section>
    <div class="container">
      <h1 class="mt-3 mt-lg-5">Welcome to Fitness Schedules, </h1> <!-- add username from session data -->
      <h3 class="text-secondary container">What will you be training today?</h3>
      <InfoCards />
    </div>
  </section>
  <Footer />
</template>

<script>
import InfoCards from './InfoCards.vue'
import Footer from './../Footer.vue'

export default {
  name: "Home",
  components: {
    InfoCards,
    Footer
  }
};
</script>

<style></style>