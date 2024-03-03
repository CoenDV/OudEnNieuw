<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" active-class="active">Go to Home</RouterLink> 
        </li>
        <li class="nav-item">
          <RouterLink to="/CreateProduct" class="nav-link" active-class="active">Create Product</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/ProductList" class="nav-link" active-class="active">Products</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style>
</style>