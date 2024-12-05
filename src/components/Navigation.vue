<template>
  <ul v-if="user" class="footer fixed-bottom py-3 nav nav-pills d-flex justify-content-center col-12">
    <li class="nav-item col" v-if="user.role == 'ROLE_USER'">
      <RouterLink to="/home" class="nav-link link-light"> <img src="/public/images/home.png" class="img-fluid"> </RouterLink>
    </li>
    <li class="nav-item col" v-if="user.role == 'ROLE_USER'">
      <RouterLink to="/quiz" class="nav-link link-light"> <img src="/public/images/quiz.png" class="img-fluid"> </RouterLink>
    </li>
    <li class="nav-item col" v-if="user.role == 'ROLE_USER'">
      <RouterLink to="/shop" class="nav-link link-light"> <img src="/public/images/cart.png" class="img-fluid"> </RouterLink>
    </li>
    <li class="nav-item col" v-if="user.role == 'ROLE_USER'">
      <RouterLink to="/challenge" class="nav-link link-light"> <img src="/public/images/target.png" class="img-fluid"> </RouterLink>
    </li>
  </ul>
</template>

<script>
import { userStore } from '../stores/store';

export default {
  name: "Navigation",
  setup() {
    const store = userStore();
    return { store };
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    }
  }
};
</script>

<style>
.footer {
  background-color: #0e0e0e;
}
</style>