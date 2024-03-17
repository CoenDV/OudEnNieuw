<template>
  <section>
    <div class="container">
      <h1 class="mt-3 mt-lg-5">Welcome to Fitness Schedules, {{ user.username }}</h1>
      <h3 class="text-secondary container">What will you be training today?</h3>
      <InfoCards />
    </div>
  </section>
  <Footer> </Footer>
</template>

<script>
import InfoCards from './InfoCards.vue'
import Footer from './../Footer.vue'

export default {
  name: "Home",
  components: {
    InfoCards,
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