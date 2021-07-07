<template>
  <div class="container">
    <div class="card m-4">
      <div class="card-header">登录表单，朴实无华</div>
      <div class="card-body">
        <form action="javascript:;">
          <div class="form-group">
            <label for="username">用户名</label>
            <input
              type="text"
              class="form-control"
              :class="form.username.valid ? '' : 'is-invalid'"
              id="username"
              aria-describedby="registerHelp"
              v-model="form.username.content"
            />
            <div class="invalid-feedback" v-show="!form.username.valid">
              {{ form.username.feedback }}
            </div>
            <small id="registerHelp" class="form-text text-muted">
              注册请前往<a href="https://masiro.me/admin/auth/login"
                >真白萌论坛</a
              >。
            </small>
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input
              type="password"
              class="form-control"
              :class="form.password.valid ? '' : 'is-invalid'"
              id="password"
              v-model="form.password.content"
            />
            <div class="invalid-feedback" v-show="!form.password.valid">
              {{ form.password.feedback }}
            </div>
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="keepLogin"
              v-model="keepLogin"
            />
            <label
              class="form-check-label"
              aria-describedby="keepLoginHelp"
              for="keepLogin"
            >
              保持登录
            </label>
            <small id="keepLoginHelp" class="form-text text-muted" v-show="keepLogin">
              无操作 3 小时以上自动注销。
            </small>
          </div>
          <button type="submit" class="btn btn-primary" @click="submitForm">
            提交
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/user";

export default {
  data() {
    return {
      form: {
        username: {
          content: "",
          valid: true,
          feedback: "",
        },
        password: {
          content: "",
          valid: true,
          feedback: "",
        },
      },
      keepLogin: false,
    };
  },
  mounted() {
    let self = this;
    this.$user.renew().then((res) => {
      if (res) {
        self.$nextTick(() => self.$router.push({ path: "/" }));
      }
    });
  },
  methods: {
    submitForm() {
      let self = this;

      validate(this.form.username, this.handleInvalid);
      validate(this.form.password, this.handleInvalid);

      // Switch cache provider
      this.$user.setCacheProvider(this.keepLogin);

      submit(this.form, this.handleInvalid).then(() => {
        // Login succeed
        self.$user.save();
        // prompt success message
        self.$bvToast.toast("登陆成功", {
          title: self.$config.VUE_APP_TITLE,
          autoHideDelay: 300,
          appendToast: false,
        });

        // Refresh and redirect to default page defined in 'mounted'
        self.$nextTick(() => {
          setTimeout(() => self.$router.go(0), 600);
        });
      });

      /**
       * Submit login form data.
       *
       * @param {Object} form form data
       * @param {Function} handleInvalid Callback function to prompt invalid message
       *
       * @returns {Promise<boolean>} request response
       */
      async function submit(form, handleInvalid) {
        let { username, password } = form;
        let { data } = await login(username.content, password.content);

        let { code, msg } = data;
        if (code !== 1) {
          handleInvalid(username, msg);
          return false;
        }

        self.$user.assign(data);

        return true;
      }

      /**
       * Validate fields.
       *
       * @param {Object} model Object with attributes of content, valid and feedback
       * @param {Function} handleInvalid Callback function to handle invalid fields
       */
      function validate(model, handleInvalid) {
        if (!model.content) {
          handleInvalid(model, "用户名不能为空！");
          return;
        }
        model.valid = true;
      }
    },
    /**
     * Handle invalid field and prompt help message.
     *
     * @param {Object} model Object to handle
     * @param {string} message String message to prompt
     */
    handleInvalid(model, message) {
      model.valid = false;
      model.feedback = message;
    },
  },
};
</script>
