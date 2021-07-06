<template>
  <div id="app">
    <nav class="nav justify-content-end">
      <li class="mav-item" v-for="route in routeLinks" :key="route.name">
        <router-link class="nav-link" :to="route.path || '/'">
          {{ route.name }}
        </router-link>
      </li>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeLinks: [],
    };
  },
  created() {
    this.routeLinks = this.$router.getRoutes();
    console.log(process.env)
  },
};
</script>

<style>
</style>