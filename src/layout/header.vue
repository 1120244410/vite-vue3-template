<script>
import { ArrowDown } from "@element-plus/icons-vue";
export default {
  components: {
    ArrowDown
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async handleCommand(value) {
      if (value === "logout") {
        await this.$api.common.logout();
        localStorage.removeItem(import.meta.env.VITE_STORAGE_USER);
        if (["dev", "develop"].includes(import.meta.env.VITE_ENV)) {
          this.$router.push("/login");
        } else {
          window.location = `https://${
            ["dev", "develop"].includes(import.meta.env.VITE_ENV)
              ? "devukih5"
              : "miaohong"
          }.neoclub.cn/neoclub/pms/`;
        }
      }
    }
  }
};
</script>

<template>
  <div class="header-container">
    <div></div>
    <div class="user">
      <ElDropdown trigger="click" @command="handleCommand">
        <span>
          你好 {{ user.phone }}/{{ user.email }}
          <el-icon class="el-icon--right"> <arrow-down /> </el-icon>
        </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem command="logout">登出</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-container {
  height: 100%;
  background-color: #2e323f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  .user {
    font-size: 12px;
    display: flex;
    align-items: center;
    :deep(.el-dropdown) {
      margin-left: 6px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
