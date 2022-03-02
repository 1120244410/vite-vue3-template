<script setup>
import locale from "element-plus/lib/locale/lang/zh-cn";
import { RouterView } from "vue-router";
</script>

<script>
export default {
  created() {
    this.handleCheckLogin();
  },
  methods: {
    getUser() {
      const user = localStorage.getItem(import.meta.env.VITE_STORAGE_USER);
      return user ? JSON.parse(user) : null;
    },
    async handleCheckLogin() {
      const user = this.getUser();
      if (user) {
        this.$store.commit("setUser", user.user);
        this.getPermission();
      } else if (["dev", "develop"].includes(import.meta.env.VITE_ENV)) {
        this.$router.push("/login");
      } else {
        window.location = `https://${
          ["dev", "develop"].includes(import.meta.env.VITE_ENV)
            ? "devukih5"
            : "miaohong"
        }.neoclub.cn/neoclub/pms/`;
      }
    },
    async getPermission() {
      const { data } = await this.$api.common.getPermission();
      this.$store.commit("setPermissions", data);
      const arr = window.location.hash.split("/");
      if (!arr[1] || arr[1] === "login") {
        this.$router.push("/home");
      }
    }
  }
};
</script>

<template>
  <ElConfigProvider :locale="locale">
    <RouterView />
  </ElConfigProvider>
</template>

<style lang="less">
html,
body {
  height: 100vh;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.page {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.pagination {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}
</style>
