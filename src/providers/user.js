import { now } from "core-js-pure/es/date";
import createCache from "./cache";
import { refreshToken } from "../api/user";

export default function () {
  const cache = createCache(sessionStorage);

  return {
    /**
     * @var cache Cache provider
     */
    cache: cache,
    /**
     * @var conf config information
     */
    conf: Object.assign(
      { token: {}, userInfo: {} },
      cache.getItem('user_info') || {}
    ),
    /**
     * @var token jwt token
     */
    get token() {
      return this.conf.token.content;
    },
    /**
     * @var info User info
     */
    get info() {
      return this.conf.userInfo;
    },
    /**
     * Renew jwt token.
     *
     * @returns {Promise<boolean>} success
     */
    async renew() {
      let self = this;
      let token = Object.assign({
        content: "",
        expires: 0
      }, this.conf.token);
      let time = Math.floor(now() / 1000);
      if (!token.content || !token.expires || token.expires < time) {
        // Requires login
        return false;
      }

      // renew if within 10 minutes before expire
      if (token.expires + 600 < time) {
        try {
          let { data } = await refreshToken(this.conf.token.content)
          if (data.code != 1)
            // Request error, apperently token is outdated
            return false;

          self.assign(data)
        } catch (err) {
          console.debug(err)
          return false;
        }
      }

      return true;
    },
    /**
     * Assign user data and jwt token.
     *
     * @param {Object} data contains user data and jwt token
     */
    assign(data) {
      this.conf.token = {
        content: data.token,
        expires: data.exp,
      };
      this.conf.userInfo = data.data;

      // Store token and user info
      this.save()
    },
    /**
     * Save to cache.
     */
    async save() {
      cache.setItem('user_info', this.conf);
    },
    /**
     * Load user data from cache.
     *
     * @returns {Object} user data
     */
    load() {
      return cache.getItem('user_info') || {};
    },
  }
}
