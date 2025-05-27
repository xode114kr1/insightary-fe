<template>
  <div class="diary_fullpage">
    <!-- 상단 날짜 및 기분 선택 -->
    <div class="diary_header">
      <div class="diary_date">{{ today }}</div>
      <div class="mood_selector">
        <span
          v-for="(emoji, mood) in moods"
          :key="mood"
          :class="['mood_item', { selected: selectedMood === mood }]"
          @click="selectedMood = mood"
        >
          {{ emoji }}
        </span>
      </div>
    </div>

    <!-- 중앙 콘텐츠: 일기 & 질문 & 사진 -->
    <div class="diary_body">
      <div class="diary_column">
        <textarea
          v-model="diaryText"
          class="diary_input"
          placeholder="오늘 하루를 기록해보세요..."
        />

        <div class="question_box" v-for="(q, i) in questions" :key="i">
          <p class="question_text">{{ q }}</p>
          <input
            v-model="answers[i]"
            type="text"
            class="answer_input"
            placeholder="나의 답변"
          />
        </div>

        <div class="image_upload">
          <label class="upload_label">
            사진 첨부
            <input type="file" @change="onImageChange" hidden />
          </label>
          <div v-if="imagePreview" class="image_preview">
            <img :src="imagePreview" alt="preview" />
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="button_group">
      <button class="save_button">일기 저장</button>
      <button class="analyze_button">성향 분석 요청</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const today = new Date().toLocaleDateString("ko-KR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const moods = {
  happy: "😄",
  sad: "😢",
  tired: "😩",
  calm: "😌",
  angry: "😠",
};
const selectedMood = ref("");
const diaryText = ref("");
const questions = [
  "오늘 가장 인상 깊었던 순간은?",
  "무엇이 당신을 힘들게 했나요?",
  "지금 기분을 한 단어로 표현한다면?",
];
const answers = ref(["", "", ""]);
const imagePreview = ref(null);

const onImageChange = (e) => {
  const file = e.target.files[0];
  if (file) imagePreview.value = URL.createObjectURL(file);
};
</script>

<style scoped>
.diary_fullpage {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #fdf9f3;
  font-family: "Georgia", serif;
  padding: 40px;
  box-sizing: border-box;
  overflow-y: auto;
  color: #5e4638;
}

.diary_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.diary_date {
  font-size: 24px;
  font-weight: bold;
}

.mood_selector {
  display: flex;
  gap: 10px;
}

.mood_item {
  font-size: 24px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.mood_item.selected {
  background-color: #f5ebdd;
  border: 2px solid #5e4638;
}

.diary_body {
  flex: 1;
  display: flex;
  justify-content: center;
}

.diary_column {
  width: 100%;
  max-width: 860px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.diary_input {
  width: 100%;
  height: 160px;
  padding: 14px;
  border: 1.5px solid #5e4638;
  background-color: #fdfbf8;
  border-radius: 12px;
  font-size: 16px;
  resize: none;
}

.question_box {
  display: flex;
  flex-direction: column;
}

.question_text {
  margin-bottom: 6px;
  font-weight: bold;
}

.answer_input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fcf7ef;
  font-size: 14px;
}

.image_upload {
  margin-top: 10px;
}

.upload_label {
  cursor: pointer;
  color: #5e4638;
  text-decoration: underline;
}

.image_preview img {
  width: 120px;
  height: auto;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #aaa;
}

.button_group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.save_button,
.analyze_button {
  padding: 12px 24px;
  background-color: #5e4638;
  color: #f5ebdd;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save_button:hover,
.analyze_button:hover {
  background-color: #3f2e24;
}
</style>
