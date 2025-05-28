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
  overflow: auto;
  scrollbar-width: none; /* Firefox */
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}
</style>
