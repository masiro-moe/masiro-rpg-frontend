"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from 'qs';

// Full config:  https://github.com/axios/axios#request-config
let config = {
  baseURL: process.env.VUE_APP_API_URL || process.env.BASE_URL || "",
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    if (config.method === 'post')
      config.data = qs.stringify(config.data);

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

let AxiosPlugin = {
  install(Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
      axios: {
        get() {
          return _axios;
        }
      },
      $axios: {
        get() {
          return _axios;
        }
      },
    });
  }
}

Vue.use(AxiosPlugin)

export default AxiosPlugin;
