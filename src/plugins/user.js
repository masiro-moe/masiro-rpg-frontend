import Vue from 'vue';
import createUser from "../providers/user";

const _user = createUser();

let UserPlugin = {
  install(Vue) {
    window.user = _user;
    Vue.user = _user;
    Object.defineProperties(Vue.prototype, {
      user: {
        get() {
          return _user;
        }
      },
      $user: {
        get() {
          return _user;
        }
      },
    });
  }
}

Vue.use(UserPlugin);

export default UserPlugin;
