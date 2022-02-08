<script setup>
import { menus } from "@/misc/menu";
</script>

<template>
  <div class="menu-title">基础平台</div>
  <el-menu
    :unique-opened="true"
    active-text-color="#ffd04b"
    background-color="#2e323f"
    :default-active="active"
    text-color="#fff"
    style="border-right: 0"
    :router="true"
  >
    <template v-for="menu in menus">
      <template v-if="$p(menu.auth, 'pages')">
        <el-sub-menu
          v-if="menu.children.length"
          :key="menu.path"
          :index="menu.path"
        >
          <template #title>
            <i :class="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </template>
          <template v-for="child in menu.children">
            <el-menu-item
              v-if="$p(child.auth, 'pages')"
              :key="child.path"
              :index="child.path"
              >{{ child.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :key="menu.path" :index="menu.path">
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  computed: {
    active() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.menu-title {
  padding: 12px;
  font-size: 24px;
  text-align: center;
  color: #fff;
}
.menu-custom {
  border: 0;
}
</style>
