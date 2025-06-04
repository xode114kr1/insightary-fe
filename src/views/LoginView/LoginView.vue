<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_box_left">
        <h2>다시 만나 반가워요 ✨</h2>
        <p>오늘 하루의 감정을 간단히 기록해보세요.</p>
      </div>
      <div class="login_box_right">
        <div class="title">Login</div>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="login_input"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="login_input"
        />
        <div class="error_message">
          {{ errorMessage }}
        </div>
        <button class="login_button" @click="handleLoginButton">Login</button>

        <div class="divider"></div>

        <p class="login_link">
          아직 계정이 없으신가요?
          <RouterLink to="/register" class="register_link">회원가입</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import api from "../../utils/api";
import { useStore } from "vuex";

const store = useStore();
const errorMessage = ref("");
const email = ref("");
const password = ref("");

const handleLoginButton = async () => {
  try {
    const res = await api.post("/user/login", {
      email: email.value,
      password: password.value,
    });
    sessionStorage.setItem("token", res.data.token);
    store.commit("setLogin", res.data.user);
    router.push("/main");
  } catch (error) {
    errorMessage.value = error.response.data;
    console.error("로그인 실패:", error);
  }
};
</script>

<style scoped>
.login_container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("@/assets/banner-main.jpg");
  background-size: cover;
  background-position: center;
  font-family: "Georgia", serif;
  padding: 20px;
  overflow: hidden; /* 추가: ::after가 벗어나지 않게 */
  z-index: 0; /* 배경은 가장 밑 */
}

.login_container::after {
  content: ""; /* 필수 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(40, 40, 40, 0.5); /* 어둡게 */
  backdrop-filter: blur(1px); /* 블러 강도 */
  z-index: 1;
}

.greeting_text {
  font-size: 20px;
  color: #4a372c;
  margin-bottom: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.login_box {
  overflow: hidden;
  width: 60%;
  height: 70%;
  background-color: #fffdf8;
  border-radius: 16px;
  border: 1px solid #d6c7a1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  z-index: 2;
  display: flex;
}

.login_box_left {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: end;
  background-image: url("@/assets/text-deco-card.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  background-attachment: local;
}

.login_box_left * {
  padding-right: 10%;
}

.login_box_right {
  padding: 20px;
  padding-top: 10%;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #3f2e24;
  margin-bottom: 10%;
}

.login_input {
  height: 50px;
  background-color: #f7efe3;
  border: 1.5px solid #5e4638;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 14px;
  color: #4a372c;
  transition: 0.2s;
  margin-bottom: 3%;
}

.login_input::placeholder {
  color: #9d8573;
  opacity: 0.9;
}

.login_input:focus {
  outline: none;
  border-color: #3f2e24;
  box-shadow: 0 0 0 2px #e4d4beaa;
}

.error_message {
  text-align: center;
  color: #f06767;
}

.login_button {
  height: 44px;
  background-color: #5e4638;
  color: #f8f4ef;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
  margin-top: 5%;
}

.login_button:hover {
  background-color: #3b2f26;
}

.divider {
  width: 100%;
  height: 1px;
  border-top: 1px solid #c4b7a5;
  margin-top: 8px;
  flex: 1;
}

.login_link {
  font-size: 13px;
  text-align: center;
  color: #5e4638;
  margin-top: 4px;
}

.register_link {
  margin-left: 4px;
  color: #3f2e24;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>
