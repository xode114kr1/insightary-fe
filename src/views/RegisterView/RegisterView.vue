<template>
  <div class="register_container">
    <img class="big_paper" src="@/assets/big-paper.png" />
    <img class="stiker butterfly" src="@/assets/stiker-butterfly.png" />
    <img class="stiker book" src="@/assets/stiker-book.png" />
    <img class="stiker postcard" src="@/assets/stiker-postcard.png" />
    <img class="stiker paper" src="@/assets/stiker-paper.png" />

    <div class="register_box">
      <div class="title">Register</div>

      <input
        type="text"
        placeholder="Name"
        class="register_input"
        v-model="name"
      />
      <input
        type="email"
        placeholder="Email"
        class="register_input"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Password"
        class="register_input"
        v-model="password"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        class="register_input"
        v-model="confirmPassword"
      />

      <label class="terms_checkbox">
        <input type="checkbox" v-model="agreeTerms" />
        이용약관 및 개인정보 처리방침에 동의합니다.
      </label>

      <button class="register_button">Sign Up</button>

      <p class="register_link">
        이미 계정이 있으신가요?
        <span @click="goToLogin">로그인</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.register_container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url("@/assets/bg-main.png");
  font-family: "Georgia", serif;
}

.title {
  text-align: center;
  margin-bottom: 25px;
  font-size: 40px;
}

.big_paper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.paper {
  left: 0;
  bottom: 0;
  width: clamp(300px, 40vw, 500px);
}
.stiker {
  position: absolute;
}

.butterfly {
  left: 0;
  top: 0;
  width: clamp(150px, 25vw, 250px);
}

.book {
  right: 0;
  bottom: 0;
  width: clamp(150px, 40vw, 330px);
}

.postcard {
  right: 0;
  top: 0;
  width: clamp(200px, 20vw, 250px);
}

.register_box {
  width: 400px;
  padding: 30px 24px;
  background-color: #ffffff;
  border: 2px solid #5e4638;
  border-radius: 18px;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: "Georgia", serif;
  z-index: 2;
}

.register_input {
  height: 45px;
  background-color: #f5ebdd;
  border: 1.5px solid #5e4638;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 14px;
  color: #5e4638;
  transition: all 0.2s ease;
}

.register_input::placeholder {
  color: #8b7765;
  opacity: 0.8;
}

.register_input:focus {
  outline: none;
  border-color: #3f2e24;
  box-shadow: 0 0 0 2px #eaddcb88;
}

.register_button {
  height: 44px;
  background-color: #5e4638;
  border: none;
  color: #f5ebdd;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: "Georgia", serif;
  transition: background-color 0.3s ease;
}

.terms_checkbox {
  font-size: 13px;
  color: #5e4638;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  margin-bottom: 10px;
}

.register_button:hover {
  background-color: #3f2e24;
  color: #ffffff;
}

.register_link {
  font-size: 13px;
  text-align: center;
  color: #5e4638;
  margin-top: 6px;
}

.register_link span {
  color: #3f2e24;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>
