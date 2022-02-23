<script setup>
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
</script>

<script>
export default {
  created() {
    this.handleCheckLogin();
  },
  methods: {
    getUser() {
      const storageName = import.meta.env.VITE_STORAGE_USER;
      const user = localStorage.getItem(storageName);
      if (user) {
        return JSON.parse(user);
      }
      return null;
    },
    async handleCheckLogin() {
      const user = this.getUser();
      if (user) {
        this.$store.commit("setUser", user.user);
        this.getPermission();
      } else if (import.meta.env.VITE_ENV === "prod") {
        window.location = `https://${
          ["dev", "devlope"].includes(import.meta.env.VITE_ENV)
            ? "devukih5"
            : "miaohong"
        }.neoclub.cn/neoclub/pms/`;
      } else {
        this.$router.push("/login");
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

<template>
  <RouterView />
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
</style>
