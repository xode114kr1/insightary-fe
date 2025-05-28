<template>
  <div class="notfound_container">
    <div class="notfound_box">
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <RouterLink to="/main" class="home_link">홈으로 돌아가기</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.notfound_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fdf9f3;
  font-family: "Georgia", serif;
}

.notfound_box {
  text-align: center;
  background-color: rgba(30, 20, 10, 0.05);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
}

.notfound_box h1 {
  font-size: 72px;
  color: #5e4638;
  margin: 0;
}

.notfound_box p {
  font-size: 18px;
  color: #8b7765;
  margin: 16px 0;
}

.home_link {
  display: inline-block;
  margin-top: 12px;
  background-color: #5e4638;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s;
}

.home_link:hover {
  background-color: #3f2e24;
}
</style>
