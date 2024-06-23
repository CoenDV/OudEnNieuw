<script>
import Navigation from './components/Navigation.vue';
import { userStore } from "./stores/store";

export default {
  name: "App",
  setup() {
    const store = userStore();
    store.autoLogin();
  },
  components: {
    Navigation
  }
};
</script>

<template>
  <navigation :key="$route.fullPath"/>
  <routerView> </routerView>
</template>

<style scoped></style>
