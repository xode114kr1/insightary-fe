<template>
  <div class="diary_contanier">
    <div class="diary_box">
      <div class="diary_card_contanier"></div>

      <div class="diary_text_contanier">
        <div class="diary_text_header">
          <div class="header_left">
            <div class="mood_icon_contanier">
              <span
                v-for="icon in moods"
                :key="icon.value"
                :class="['mood_icon', { selected: mood === icon.value }]"
                @click="mood = icon.value"
              >
                {{ icon.emoji }}
              </span>
            </div>
          </div>

          <div class="header_center">{{ formattedDay }}</div>

          <div class="header_right">
            <button @click="handleSaveButton">저장</button>
          </div>
        </div>

        <div class="diary_text_erea_contanier">
          <div class="diary_input">
            <p>오늘의 일기</p>
            <input placeholder="하루를 요약해보세요..." v-model="content" />
          </div>

          <div class="diary_input">
            <p>{{ question }}</p>
            <input
              placeholder="기억에 남는 한 장면은 무엇인가요?"
              v-model="answer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/utils/api";
import { formatDateToKorean } from "@/utils/data";
import { ref } from "vue";
const today = new Date();
const formattedDay = ref(formatDateToKorean(today));

const content = ref("");
const question = ref("");
const answer = ref("");
const mood = ref("happy");

const moods = [
  { value: "happy", emoji: "😊" },
  { value: "sad", emoji: "😢" },
  { value: "angry", emoji: "😠" },
  { value: "surprised", emoji: "😲" },
  { value: "soso", emoji: "😐" },
];

const handleSaveButton = async () => {
  try {
    const res = await api.post("/diary/save", {
      content: content.value,
      question: question.value,
      answer: answer.value,
      mood: mood.value,
    });
    console.log(res.data);
  } catch (error) {
    alert("저장 에러 : ", error.message);
  }
};

// API 호출 과다를 방지하기 위하여
// onMounted(async () => {
//   try {
//     const res = await api.get("/diary/question");
//     question.value = res.data.question;
//   } catch (error) {
//     question.value = "오늘 가장 인상 싶었던 순간은?";
//     console.log(error.message);
//   }
// });
</script>

<style scoped>
.diary_contanier {
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
  overflow: hidden;
  z-index: 0;
}

.diary_contanier::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(40, 40, 40, 0.5);
  backdrop-filter: blur(1px);
  z-index: 1;
}

.diary_box {
  width: 90%;
  height: 80%;
  background-color: #fdf9f3;
  border: 2px solid #5e4638;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.diary_card_contanier {
  width: 30%;
  max-width: 500px;
  height: 90%;
  aspect-ratio: 2 / 3;
  background-image: url("@/assets/season/card-spring1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.2);
}

.diary_text_contanier {
  width: 60%;
  height: 90%;
  gap: 15px;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.diary_text_header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #ddc6ad;
  padding: 14px 20px;
  justify-content: space-between;
  border-radius: 8px;
  font-family: "Georgia", serif;
  font-size: 16px;
  font-weight: bold;
  color: #5e4638;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
}

.diary_text_header button {
  background-color: #5e4638;
  color: #fdf9f3;
  border: none;
  padding: 8px 18px;
  font-size: 14px;
  font-family: "Georgia", serif;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.diary_text_header button:hover {
  background-color: #3f2e24;
}

.header_center {
  text-align: center;
}

.header_left,
.header_right {
  max-width: 240px;
  flex: 1;
  display: flex;
  align-items: center;
}

.header_left {
  justify-content: start;
}

.header_right {
  justify-content: end;
}

.mood_icon {
  font-size: 24px;
  cursor: pointer;
  margin: 0 4px;
  transition: transform 0.2s ease;
}

.mood_icon:hover {
  transform: scale(1.2);
}

.mood_icon.selected {
  transform: scale(1.3);
  border-bottom: 2px solid #5e4638;
}

.diary_text_erea_contanier {
  margin-top: 20px;
  display: flex;
  gap: 18px;
  width: 100%;
  flex-grow: 1;
}

.diary_input {
  display: flex;
  flex-direction: column;
  background-color: #fdf9f3;
  border: 2px solid #5e4638;
  border-radius: 12px;
  flex: 1;
  gap: 6px;
  font-family: "Georgia", serif;
  color: #5e4638;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
}

.diary_input p {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.diary_input input {
  height: 100%;
  padding: 10px 16px;
  border: none;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  background-color: #fdf5e6;
  font-family: "Georgia", serif;
  font-size: 15px;
  color: #4b3c2f;
  box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.diary_input input::placeholder {
  color: #a08c7a;
  font-style: italic;
  opacity: 0.8;
}

.diary_input input:focus {
  outline: none;
}
</style>
