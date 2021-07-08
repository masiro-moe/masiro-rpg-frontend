<template>
  <div>
    <div class="user-avatar d-flex flex-column align-items-center">
      <div class="mt-2 mb-3">
        <b-avatar
          size="90px"
          variant="info"
          :src="userInfo.avatar + '?quality=80'"
        ></b-avatar>
      </div>
      <div>
        {{ userInfo.name }}
        <b-badge pill variant="info">lv{{ userInfo.level }}</b-badge>
      </div>
      <small>ID: {{ userInfo.user_id }}</small>
      <small v-show="requireLogin()" class="mt-1 text-danger">登录过期</small>
    </div>
    <div class="d-flex flex-row">
      <a href="javascript:;" @click="logout" class="btn btn-link shadow-none flex-fill">
        <small>登出</small>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userInfo"],
  methods: {
    requireLogin() {
      return this.$user.requireLogin();
    },
    logout() {
      this.$user.reset()
      this.$router.go(0)
    },
  },
};
</script>

<style scoped>
.user-avatar {
  height: 175px;
  width: 280px;
  padding: 10px;
  text-align: center;
}
</style>