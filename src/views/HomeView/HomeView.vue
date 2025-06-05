<template>
  <div class="home_container">
    <div class="overlay"></div>

    <div class="banner_text_contanier">
      <div class="banner_title">Insightary</div>
      <div class="banner_subtitle">Your words shape your days</div>
    </div>

    <img class="center_card" src="@/assets/card-main.png" alt="Main card" />

    <button class="start_button" @click="handleStart">시작하기</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const handleStart = () => {
  const isLogin = store.state.isLogin;
  router.push(isLogin ? "/main" : "/login");
};
</script>

<style scoped>
.home_container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 20px;
  background-image: url("@/assets/banner-main.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Georgia", serif;
  overflow: hidden;
}

/* 블러 및 어둡게 오버레이 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(40, 40, 40, 0.45);
  backdrop-filter: blur(2px);
  z-index: 1;
}

/* 텍스트 감싸는 컨테이너 */
.banner_text_contanier {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px 30px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
  margin-bottom: 30px;
}

.banner_title {
  font-size: 58px;
  color: #ffffff;
  font-weight: bold;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
}

.banner_subtitle {
  font-size: 18px;
  color: #e0e0e0;
  margin-top: 8px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* 가운데 카드 이미지 */
.center_card {
  position: relative;
  z-index: 2;
  width: clamp(150px, 30vw, 400px);
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* 시작 버튼 */
.start_button {
  position: relative;
  z-index: 2;
  width: 200px;
  height: 45px;
  border-radius: 24px;
  background-color: #dde8c4;
  border: 2px solid #bfaf9a;
  color: #3b3b3b;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
}

.start_button:hover {
  background-color: #cae0c2;
  transform: scale(1.03);
}
</style>
