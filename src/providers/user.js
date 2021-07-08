import { now } from "core-js-pure/es/date";
import { refreshToken } from "../api/user";
import createCache from "../providers/cache";

/**
 * Create user provider instance.
 *
 * @param {Object} cache Cache provider
 * @returns {Object} User provider
 */
export default function (cache = createCache(
  localStorage.getItem("keep_login") == "true" ?
    localStorage : sessionStorage
)) {
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
     * Switch storage of cache provider.
     *
     * @param {boolean} keepLogin
     */
    setCacheProvider(keepLogin) {
      console.log(keepLogin)
      this.cache = createCache(
        keepLogin ?
          localStorage : sessionStorage
      );
      localStorage.setItem("keep_login", keepLogin);
      this.save();
    },
    /**
     * Determine if user needs to login.
     *
     * @returns {boolean}
     */
    requireLogin() {
      let token = this.conf.token,
        time = Math.floor(now() / 1000);
      return (!token.content || !token.expires || token.expires < time)
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
      this.cache.setItem('user_info', this.conf);
    },
    /**
     * Load user data from cache.
     *
     * @returns {Object} user data
     */
    load() {
      return this.cache.getItem('user_info') || {};
    },
  }
}
