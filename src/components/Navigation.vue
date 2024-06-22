<template>
    <ul class="footer fixed-bottom py-3 nav nav-pills d-flex justify-content-center">
      <li class="nav-item">
        <RouterLink to="/home" class="nav-link link-light"> Home </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/quiz" class="nav-link link-light"> Quiz </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/shop" class="nav-link link-light"> Shop </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/challenge" class="nav-link link-light"> Challenge </RouterLink>
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
  }
};
</script>

<style>
.footer {
  background-color: #0e0e0e;
}
</style>