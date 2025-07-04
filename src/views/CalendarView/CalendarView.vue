<template>
  <div class="calendar_summary_container">
    <div class="left_section">
      <div class="title_date_text">{{ format(selectedDate) }}</div>
      <div class="diary_integration_contanier">
        <div class="diary_contanier">
          <div class="diary_title_contanier">일기</div>
          <div class="diary_content_contanier">{{ content }}</div>
        </div>
        <div class="diary_contanier">
          <div class="diary_title_contanier">{{ question }}</div>
          <div class="diary_content_contanier">{{ answer }}</div>
        </div>
      </div>
    </div>

    <div class="right_section">
      <div class="calendar_box">
        <Datepicker
          v-model="selectedDate"
          :inline="true"
          :auto-apply="true"
          :enable-time-picker="false"
          :format="displayFormat"
          @update:modelValue="handleDateChange"
        />
      </div>

      <div class="week_text_box">
        <h3>{{ getWeekRange(selectedDate) }}</h3>
        <div class="week_short_text">
          <div>{{ weeklyShortSummary }}</div>
        </div>
        <div class="week_summary_text">
          <h3>Summary</h3>
          <div>{{ weeklySummary }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import api from "@/utils/api";
import { ref, onMounted, nextTick } from "vue";

const selectedDate = ref(new Date());
const weeklyShortSummary = ref("");
const weeklySummary = ref("");
const content = ref("참 재밌었다");
const question = ref("");
const answer = ref("");

// 포맷: "2025년 6월 9일"
const format = (d) =>
  `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
const displayFormat = (date) => format(date);

const handleDateChange = async (date) => {
  if (!date || isNaN(date.getTime())) return;
  selectedDate.value = date;
  await nextTick();
  await fetchDiary();
  await fetchWeeklySummary();
};

const fetchDiary = async () => {
  try {
    const dateStr = selectedDate.value.toLocaleDateString("sv-SE");
    const res = await api.get("/diary", { params: { date: dateStr } });

    content.value = res.data.content;
    question.value = res.data.question;
    answer.value = res.data.answer;
  } catch (error) {
    content.value = "작성된 일기가 없습니다";
    question.value = "";
    answer.value = "";
  }
};

const fetchWeeklySummary = async () => {
  try {
    const dateStr = selectedDate.value.toLocaleDateString("sv-SE");
    const res = await api.get("/analysis/weekly", {
      params: { date: dateStr },
    });
    weeklyShortSummary.value = res.data.shortSummary;
    weeklySummary.value = res.data.summary;
  } catch (error) {
    weeklyShortSummary.value = "작성된 주간 요약이 없습니다";
    weeklySummary.value = "";
  }
};

const getWeekRange = (date) => {
  const curr = new Date(date);
  const day = curr.getDay();
  const start = new Date(curr);
  const diffToMonday = day === 0 ? -6 : 1 - day;
  start.setDate(curr.getDate() + diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return `${format(start)} ~ ${format(end)}`;
};

onMounted(async () => {
  await fetchDiary();
  await fetchWeeklySummary();
});
</script>

<style scoped>
.calendar_summary_container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/banner-main.jpg");
  background-size: cover;
  background-position: center;
  padding: 0 5%;
  gap: 3%;
  font-family: "Georgia", serif;
  background-color: #fdf9f3;
  height: 100vh;
  z-index: 0;
}

.calendar_summary_container::after {
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
.calendar_summary_container > div {
  z-index: 2;
}
.left_section {
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2;
  width: 100%;
  background-color: #fff6ea;
  border: 2px solid #5e4638;
  border-radius: 16px;
  box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.1);
}

.title_date_text {
  font-size: 20px;
  font-weight: bold;
  color: #5e4638;
  height: 7%;
  width: 100%;
  border-bottom: 2px solid #5e4638;
  display: flex;
  align-items: center;
  justify-content: center;
}
.diary_integration_contanier {
  display: flex;
  height: 93%;
  width: 100%;
  padding: 30px;
  gap: 20px;
}

.diary_contanier,
.question_contanier {
  flex-grow: 1;
  max-width: 50%;
  border: 2px solid #5e4638;
  border-radius: 15px;
}

.diary_title_contanier {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #5e4638;
  height: 8%;
  border-bottom: 2px solid #5e4638;
}

.diary_content_contanier {
  padding: 10px;
  width: 100%;
  height: 92%;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background-color: #fdf9f3;
}

.calendar_title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #5e4638;
}

.custom_calendar {
  font-size: 18px;
  --vc-accent-100: #5e4638;
  --vc-accent-600: #5e4638;
  --vc-highlight-solid-bg: #5e4638;
}

.right_section {
  padding: 10px;
  height: 80%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff6ea;
  border: 2px solid #5e4638;
  border-radius: 16px;
  box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.08);
}

.right_section > div {
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.right_section > div::-webkit-scrollbar {
  display: none;
}

.calendar_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  height: 40%;
  overflow: hidden;
}

.calendar_box > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.week_text_box {
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  border-top: 1px solid #5e4638;
  font-size: 16px;
}

.week_text_box h3 {
  margin-bottom: 16px;
  font-size: 20px;
  color: #5e4638;
}

.week_short_text {
  width: 100%;
  text-align: center;
}

.week_short_text div {
  width: 100%;
  border-top: 1px solid #5e4638;
  border-bottom: 1px solid #5e4638;
  padding: 10px 0;
  background-color: #fdf9f3;
}

.week_summary_text {
  width: 95%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.week_summary_text div {
  padding: 5px;
  width: 95%;
  flex-grow: 1;
  border: 1px solid #5e4638;
  border-radius: 8px;
  background-color: #fdf9f3;
}
</style>
