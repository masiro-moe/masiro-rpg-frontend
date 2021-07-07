import Vue from 'vue';

const _config = process.env;

let ConfPlugin = {
  install(Vue) {
    Vue.env = _config;
    Object.defineProperties(Vue.prototype, {
      $config: {
        get() {
          return _config;
        }
      },
    });
  }
}

Vue.use(ConfPlugin);

export default ConfPlugin;
