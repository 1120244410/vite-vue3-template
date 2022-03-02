<template>
  <section class="page">
    <h1 class="title">模版项目</h1>
    <ElCard class="card" shadow>
      <ElForm
        ref="form"
        :model="form"
        :rules="rules"
        @keyup.native.enter="handleSubmit"
      >
        <ElFormItem prop="account">
          <ElInput
            v-model.trim="form.account"
            placeholder="输入 phone/email"
            @on-change="form.code = ''"
          />
        </ElFormItem>
        <ElFormItem prop="code">
          <section class="form-inline">
            <ElInput v-model="form.code" clearable type="password">
              <Icon slot="prepend" type="ios-lock-outline" />
            </ElInput>
            <ElButton :disabled="!canSendCode" @click="handleSendCode">
              {{ countdown ? `${countdown}s` : "获取验证码" }}
            </ElButton>
          </section>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="handleSubmit" style="width: 100%">
            登录
          </ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </section>
</template>

<script>
const reg = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
let form = {
  phone: "",
  email: "",
  type: 1
};
export default {
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (value.includes("@")) {
          if (!reg.test(value)) {
            callback(new Error("请输入正确的邮箱格式"));
          }
          form.email = value;
          form.phone = "";
        } else {
          form.email = "";
          form.phone = value;
        }
        callback();
      }
    };
    return {
      form: {
        code: "",
        account: ""
      },

      rules: {
        account: [
          {
            validator: validateAccount,
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      countdown: 0
    };
  },

  computed: {
    canSendCode() {
      return this.form.account && this.countdown <= 0;
    }
  },

  methods: {
    handleSendCode() {
      this.$refs.form.validateField("account", err => {
        if (!err) {
          this.countdown = 10;
          const timer = setInterval(() => {
            if (this.countdown <= 0) {
              clearInterval(timer);
            } else {
              this.countdown--;
            }
          }, 1000);
          this.getCode();
        }
      });
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        valid && this.submit();
      });
    },

    async getCode() {
      try {
        const { code, message } = await this.$api.common.getSmsCode(form);
        if (code === 0 || code === 200) {
          this.$Message.success(message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async submit() {
      const { code, data, message } = await this.$api.common.postLogin({
        ...form,
        code: this.form.code
      });
      if (code === 0 || code === 200) {
        const { phone, name, token, email } = data;
        const user = { phone, name, email };
        const loginInfo = {
          token,
          user,
          cellphone: phone,
          uid: "",
          manageLevel: data.super ? 9999 : 99
        };
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_USER,
          JSON.stringify(loginInfo)
        );
        this.$store.commit("setUser", user);
        this.getPermission();
        this.$router.replace("/home/");
      }
    },
    async getPermission() {
      const { data } = await this.$api.common.getPermission();
      this.$store.commit("setPermissions", data);
      this.$router.push("/home/");
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    margin-bottom: 24px;
    font-weight: normal;
    text-align: center;
  }
  .card {
    width: 360px;
    .sel {
      width: 80px;
    }
    .form-inline {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
