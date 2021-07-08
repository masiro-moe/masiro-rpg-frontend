/**
 * Create cache provider instance.
 *
 * @param {Object} driver storage driver, should implement
 * `setItem(key, value)` and `getItem(key)`
 * @returns {Object} Cache provider
 */
export default function (driver) {
  return {
    /**
     * @var {Object} storage storage driver
     */
    storage: driver,
    /**
     * Stores cache content.
     *
     * @param {string} key string associated to value
     * @param {Object} value content to store
     */
    setItem: function (key, value) {
      this.storage.setItem(key,
        window.btoa(JSON.stringify(value))
      );
    },
    /**
     * Get current value associated with the given key.
     *
     * @param {string} key key associated to content
     * @returns {Object} Cache content
     */
    getItem: function (key) {
      // "e30=" means `window.btoa(JSON.stringify({}))' aka empty object
      let str = this.storage.getItem(key) || "e30=";
      return JSON.parse(window.atob(str))
    }
  }
}
