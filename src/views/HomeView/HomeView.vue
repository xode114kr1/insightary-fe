<template>
  <div class="home_container">
    <div class="stiker banner_text_contanier">
      <div class="banner_title">Insightary</div>
      <div class="banner_text">Your words shape your days</div>
    </div>

    <div class="stiker text1">
      There will be days when writing feels pointless <br />
      when your thoughts are too heavy, your heart too quiet, <br />
      and the world too loud to listen to yourself. <br />
      But in those exact moments, your words matter the most. <br />
      Because they don't need to be perfect <br />
      they just need to exist,<br />
      to prove that you did too.
    </div>

    <div class="stiker text2">
      You won’t always understand what you’re feeling,<br />
      but if you write it down,<br />
      you give your heart a chance to explain it to you.
    </div>
    <img class="stiker butterfly" src="@/assets/stiker-butterfly.png" />
    <img class="stiker center_card" src="@/assets/card-main.png" />
    <img class="stiker book" src="@/assets/stiker-book.png" />
    <img class="stiker postcard" src="@/assets/stiker-postcard.png" />
    <img class="stiker tape" src="@/assets/stiker-tape.png" />
    <img class="stiker paper" src="@/assets/stiker-paper.png" />
    <button class="stiker start_button" @click="handleStart">시작하기</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const handleStart = () => {
  const isLogin = store.state.isLogin;
  if (isLogin) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
};
</script>

<style scoped>
.home_container {
  height: 100%;
  font-family: "Georgia", serif;
}

.stiker {
  position: absolute;
}

.center_card {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: clamp(150px, 30vw, 400px);
  z-index: 1;
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

.tape {
  left: 50%;
  top: 50%;
  transform: translate(80%) rotate(-10deg);
  width: clamp(100px, 30vw, 150px);
}

.paper {
  left: 0;
  bottom: 0;
  width: clamp(300px, 40vw, 500px);
}

.text1 {
  top: 40%;
  right: 2%;
}

.text2 {
  top: 25%;
  left: 15%;
}

.banner_text_contanier {
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.banner_title {
  font-size: 60px;
  margin-bottom: 10px;
  font-weight: bold;
}

.banner_text {
  font-size: 20px;
}
.start_button {
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  z-index: 1;

  width: 200px;
  height: 45px;
  border-radius: 24px;

  background-color: #dde8c4; /* 밝은 연녹색 */
  border: 2px solid #bfaf9a; /* 따뜻한 베이지 테두리 */
  color: #3b3b3b; /* 웜그레이 글자 */

  font-size: 17px;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
}

.start_button:hover {
  background-color: #cae0c2; /* 살짝 더 짙은 민트톤 */
  transform: translateX(-50%) scale(1.03);
}
</style>
