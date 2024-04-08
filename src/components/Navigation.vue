<template>
  <div class="container-fluid bg-light">
    <header class="d-flex justify-content-center py-3 mb-1 border-bottom">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <RouterLink to="/home" class="nav-link" active-class="active" :class="{ disabled: !store.isLoggedIn }">Home
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/schedules/publicschedules" class="nav-link" active-class="active"
            :class="{ disabled: !store.isLoggedIn }" :key="$route.url">Public Schedules
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/schedules/ownschedules" class="nav-link" active-class="active"
            :class="{ disabled: !store.isLoggedIn }" :key="$route.url">Own Schedules</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/account" class="nav-link" active-class="active" :class="{ disabled: !store.isLoggedIn }">
            Account</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/schedules/create" class="btn border-primary text-primary mx-2" active-class="active"
            :class="{ disabled: !store.isLoggedIn }">Create a
            Schedule</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" active-class="active" v-if="store.isLoggedIn">Logout</RouterLink>
          <RouterLink to="/" class="nav-link" active-class="active" v-else>Login</RouterLink>
        </li>
      </ul>
    </header>
  </div>
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
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>