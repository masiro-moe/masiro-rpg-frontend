export default (driver) => {
  return {
    storage: driver,

    setItem: function (key, value) {
      this.storage.setItem(key,
        window.btoa(JSON.stringify(value))
      );
    },

    getItem: function (key) {
      // "e30=" means `window.btoa(JSON.stringify({}))' aka empty object
      let str = this.storage.getItem(key) || "e30=";
      return JSON.parse(window.atob(str))
    }
  }
};
