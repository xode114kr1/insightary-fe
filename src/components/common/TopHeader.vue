<template>
  <header class="header">
    <div style="width: 100px"></div>
    <div class="header_left">
      <RouterLink class="logo" to="/main">Insightary</RouterLink>
    </div>

    <div class="header_right">
      <button v-if="isLogin" class="auth_button" @click="handleLogout">
        Logout
      </button>
      <RouterLink to="/login" v-else class="auth_button">Login</RouterLink>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const isLogin = computed(() => store.state.isLogin);

const handleLogout = () => {
  store.commit("getLogout");
};
</script>

<style scoped>
.header {
  position: absolute;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 50px;
  background-color: #f5ebdd;
  border-bottom: 2px solid #5e4638;
  font-family: "Georgia", serif;
}

.logo {
  font-size: 30px;
  color: #5e4638;
  font-weight: bold;
  text-decoration: none;
}

.logo:hover {
  cursor: pointer;
}

.header_right {
  display: flex;
  gap: 10px;
}

.auth_button {
  width: 100px;
  text-align: center;
  background-color: #5e4638;
  color: #f5ebdd;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.auth_button:hover {
  background-color: #3f2e24;
}
</style>
