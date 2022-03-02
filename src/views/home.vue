<script setup>
import { RouterView } from "vue-router";
import Menu from "@/layout/menu.vue";
import Header from "@/layout/header.vue";
</script>

<template>
  <ElContainer style="height: 100%">
    <ElAside width="200px" class="home-aside">
      <Menu />
    </ElAside>
    <ElContainer>
      <ElHeader style="background-color: #2e323f;">
        <Header />
      </ElHeader>
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped>
.home-aside {
  background-color: #2e323f;
}
</style>
