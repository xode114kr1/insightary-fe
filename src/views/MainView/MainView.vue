<template>
  <div class="main_container">
    <div class="section first_floor">
      <div class="book_overlay">
        <h2>오늘 하루도 잘 기록해보셨나요?</h2>
        <p>기록은 나를 이해하는 첫걸음이에요 ✍️</p>
        <RouterLink to="/diary" class="write_button">기록하기</RouterLink>
      </div>
    </div>

    <div class="section second_floor">
      <div class="small_card">
        <div class="small_card_title">
          <h3>이번 주 기록 요일</h3>
          <img
            class="calendar_img"
            @click="handleCalender"
            src="@/assets/icon-calendar.png "
            alt="calendar icon"
            width="20"
          />
        </div>

        <div class="weekly_progress">
          <div class="day_box" v-for="(day, index) in week" :key="index">
            <span>{{ day.label }}</span>
            <div class="dot" :class="{ active: day.written }"></div>
          </div>
          <div class="progress_text">
            진행도: {{ writtenCount }}/7일 ({{
              Math.round((writtenCount / 7) * 100)
            }}%)
          </div>
        </div>
      </div>

      <div class="small_card">
        <div><h3>감정 요약</h3></div>

        <p>{{ shortWeekAnalysis }}</p>
      </div>

      <div class="small_card">
        <div><h3>총 작성한 다이어리</h3></div>
        <p>총 {{ diaryCount }}개의 다이어리를 작성했어요 📘</p>
      </div>
    </div>

    <div class="section third_floor">
      <div class="medium_card">
        <div class="medium_title_box">
          <div class="title_with_button">
            <span>내 성격 & 성향</span>
            <button
              class="refresh_button"
              @click="handleClick"
              :disabled="loading"
            >
              <svg v-if="loading" class="spinner-icon" viewBox="0 0 50 50">
                <circle
                  class="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="4"
                />
              </svg>
              <span v-else>
                <svg
                  class="icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#3f2e24"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <p>{{ personalitySummary }}</p>
      </div>

      <div class="medium_card">
        <div class="title_with_button">
          <span>추천 행동</span>
        </div>

        <p>
          {{ recommendedActions }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import api from "@/utils/api";

const router = useRouter();
const handleCalender = () => {
  router.push("/calendar");
};

const week = ref([
  { label: "월", written: false },
  { label: "화", written: false },
  { label: "수", written: false },
  { label: "목", written: false },
  { label: "금", written: false },
  { label: "토", written: false },
  { label: "일", written: false },
]);
const diaryCount = ref(0);
const personalitySummary = ref("");
const recommendedActions = ref("");
const shortWeekAnalysis = ref("");
const loading = ref(false);

const handleClick = async () => {
  loading.value = true;
  try {
    await updateAnalysis();
  } catch (e) {
    console.error("최신화 실패", e.message);
  } finally {
    loading.value = false;
  }
};

const fetchWeeklyAnalysis = async () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  try {
    const res = await api.get("/analysis/weekly", {
      params: { date: todayStr },
    });
    shortWeekAnalysis.value = res.data.shortSummary;
  } catch (error) {
    if (error.response?.status === 404) {
      shortWeekAnalysis.value = "아직 이 주차의 분석이 없어요.";
    } else {
      shortWeekAnalysis.value = "분석을 불러오는 중 오류가 발생했어요.";
      console.error(error);
    }
  }
};

const fetchWeekStatus = async () => {
  const dayMap = {
    mon: 0,
    tue: 1,
    wed: 2,
    thu: 3,
    fri: 4,
    sat: 5,
    sun: 6,
  };
  try {
    const res = await api.get("/diary/week-status");
    const data = res.data.weekStatus;

    for (const [key, value] of Object.entries(data)) {
      const index = dayMap[key];
      if (index !== undefined) {
        week.value[index].written = value;
      }
    }
  } catch (error) {
    console.error("주간 기록 정보를 불러오지 못했습니다.", error.message);
  }
};

const fetchDiaryCount = async () => {
  try {
    const res = await api.get("/diary/count");
    diaryCount.value = res.data.count;
  } catch (error) {
    console.error("작성된 다이어리 개수를 불러오지 못했습니다", error.message);
  }
};

const fetchAnalysis = async () => {
  try {
    const res = await api.get("/analysis");
    personalitySummary.value = res.data.personalitySummary;
    recommendedActions.value = res.data.recommendedActions;
  } catch (error) {
    console.error("전체 성향 분석을 불러오지 못했습니다", error.message);
  }
};

const updateAnalysis = async () => {
  try {
    const res = await api.post("/analysis/refresh");
    personalitySummary.value = res.data.personalitySummary;
    recommendedActions.value = res.data.recommendedActions;
  } catch (error) {
    console.error("성향을 최신화 하는데 오류가 발생했습니다", error.message);
  }
};

onMounted(async () => {
  await Promise.all([
    fetchWeeklyAnalysis(),
    fetchWeekStatus(),
    fetchDiaryCount(),
    fetchAnalysis(),
  ]);
});

const writtenCount = computed(() => week.value.filter((d) => d.written).length);
</script>

<style scoped>
.main_container {
  padding-top: 60px;
  font-family: "Georgia", serif;
  background-color: #fdf9f3;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section {
  margin: 0 10%;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.first_floor {
  height: 60vh;
  margin: 0;
  background-image: url("@/assets/bg-main.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  z-index: 0;
}

.first_floor::after {
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

.book_overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(30, 20, 10, 0.5);
  border-radius: 16px;
  text-align: center;
  color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  width: 30%;
  height: 40%;
  z-index: 2;
}

.book_overlay h2 {
  font-size: 20px;
  margin-bottom: 8px;
  font-family: "Georgia", serif;
}

.book_overlay p {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 16px;
}

.second_floor {
  justify-content: space-between;
}

.third_floor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;
}

.write_button {
  background-color: #5e4638;
  color: #fdf9f3;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s;
}

.write_button:hover {
  background-color: #3f2e24;
}

.small_card {
  background-color: #fff6ea;
  padding: 20px;
  border-radius: 12px;
  border: 1.5px solid #5e4638;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.08);
  font-size: 15px;
  flex: 1;
  min-width: 260px;
}

.small_card_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.medium_card {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1.5px solid #5e4638;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.08);
  font-size: 15px;
}

.title_with_button {
  font-size: 1.17em;
  font-weight: bold;
}

.medium_title_box p {
  display: flex;
  justify-content: space-between;
}

.title_with_button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weekly_progress {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.day_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #5e4638;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #ddd;
}

.dot.active {
  background-color: #5e4638;
}

.progress_text {
  font-size: 13px;
  margin-left: 12px;
  color: #5e4638;
}

.refresh_button {
  background: inherit;
  border: none;
}

.refresh_button:hover {
  cursor: pointer;
}

.spinner-icon {
  animation: spin 1s linear infinite;
  width: 16px;
  height: 16px;
}

.path {
  stroke: #3f2e24;
  stroke-linecap: round;
}

.calendar_img {
  transition: transform 0.3s ease;
}

.calendar_img:hover {
  cursor: pointer;
  transform: scale(1.3);
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
