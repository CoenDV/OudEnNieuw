<template>
  <div class="container-fluid bg-light">
    <header class="d-flex justify-content-center py-3 mb-1 border-bottom">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <RouterLink to="/home" class="nav-link" active-class="active">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/schedules/publicschedules" class="nav-link" active-class="active">Public Schedules
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/schedules/ownschedules" class="nav-link" active-class="active">Own Schedules</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/account" class="nav-link" active-class="active">Account</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/schedules/create" class="btn btn-primary" active-class="active">Create a Schedule</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" active-class="active">Logout</RouterLink>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style></style>