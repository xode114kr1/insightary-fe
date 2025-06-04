<template>
  <div class="register_container">
    <div class="register_box">
      <div class="register_box_left">
        <h2>환영합니다! 🎉</h2>
        <p>지금 가입하고, 매일의 감정을 Insightary에 기록해보세요.</p>
      </div>
      <div class="register_box_right">
        <div class="title">Register</div>
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="register_input"
        />
        <input v-model="birth" type="date" class="register_input" />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="register_input"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="register_input"
        />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="register_input"
        />
        <button class="register_button" @click="handleRegisterButton">
          Sign Up
        </button>

        <div class="divider"></div>

        <p class="register_link">
          이미 계정이 있으신가요?
          <RouterLink to="/login" class="login_link">로그인</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import api from "@/utils/api";
import { ref } from "vue";
const name = ref("");
const birth = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegisterButton = async () => {
  // 회원가입 처리 (추후 API 연동)
  if (password.value !== confirmPassword.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  try {
    const res = await api.post("/user/register", {
      name: name.value,
      birthDate: birth.value,
      email: email.value,
      password: password.value,
    });
    console.log(res);
    router.push("/login");
  } catch (error) {
    console.error("회원가입입 실패:", error);
  }
  router.push("/login");
};
</script>

<style scoped>
.register_container {
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

.register_container::after {
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

.register_box {
  overflow: hidden;
  width: 60%;
  height: 80%;
  background-color: #fffdf8;
  border-radius: 16px;
  border: 1px solid #d6c7a1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  z-index: 2;
  display: flex;
}

/* 좌측 설명 영역 */
.register_box_left {
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

.register_box_left * {
  padding-right: 10%;
}

/* 우측 입력 영역 */
.register_box_right {
  padding: 20px;
  padding-top: 8%;
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

.register_input {
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

.register_input::placeholder {
  color: #9d8573;
  opacity: 0.9;
}

.register_input:focus {
  outline: none;
  border-color: #3f2e24;
  box-shadow: 0 0 0 2px #e4d4beaa;
}

.register_button {
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

.register_button:hover {
  background-color: #3b2f26;
}

.divider {
  width: 100%;
  height: 1px;
  border-top: 1px solid #c4b7a5;
  margin-top: 8px;
  flex: 1;
}

.register_link {
  font-size: 13px;
  text-align: center;
  color: #5e4638;
  margin-top: 4px;
}

.login_link {
  margin-left: 4px;
  color: #3f2e24;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>
