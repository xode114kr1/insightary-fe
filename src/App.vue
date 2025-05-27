<template>
  <TopHeader v-if="!$route.meta.hindHeader" />
  <router-view />
</template>

<script setup>
import TopHeader from "./components/common/TopHeader.vue";
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
}
</style>
