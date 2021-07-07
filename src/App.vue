<template>
  <div id="app">
    <nav class="nav flex-sm-row flex-column shadow-sm px-4 py-2">
      <!-- Left Side Of Navbar -->
      <ul class="navbar-nav justify-content-center flex-fill">
        <li
          class="
            nav-item
            d-flex
            justify-content-center justify-content-sm-start
          "
        >
          <a class="navbar-brand mr-0" href="/">
            {{ $config.VUE_APP_TITLE }}
          </a>
        </li>
      </ul>

      <!-- Right Side Of Navbar -->
      <ul class="navbar-nav flex-sm-row flex-column justify-content-end">
        <li
          class="nav-item mx-auto px-2"
          v-for="route in routes"
          :key="route.name"
        >
          <router-link
            v-show="!(route.name === '登录' && userInfo.avatar)"
            class="text-sm-center nav-link"
            :to="route.path || '/'"
          >
            {{ route.name }}
          </router-link>
        </li>
        <li
          class="
            nav-item
            flex-row
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
        >
          <template v-if="userInfo && userInfo.avatar">
            <b-avatar
              variant="info"
              :src="userInfo.avatar + '?quality=10'"
            ></b-avatar>
          </template>
          <template v-else></template>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [],
      userInfo: {},
    };
  },
  created() {
    this.routes = this.$router.getRoutes();
    let self = this;
    this.$user.renew().then((res) => {
      if (!res) {
        self.$router.push({ name: "登录" });
      }

      self.userInfo = self.$user.info;
    });
  },
};
</script>

<style>
body {
  user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}
</style>