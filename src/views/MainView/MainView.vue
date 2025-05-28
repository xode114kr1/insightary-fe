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
        <h3>이번 주 기록 요일</h3>
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
        <h3>감정 요약</h3>
        <p>이번 주는 전반적으로 차분하고 안정적인 감정 상태였어요.</p>
      </div>

      <div class="small_card">
        <h3>총 작성한 다이어리</h3>
        <p>총 48개의 다이어리를 작성했어요 📘</p>
      </div>
    </div>

    <div class="section third_floor">
      <div class="medium_card">
        <h3>내 성격 & 성향</h3>
        <p>
          당신은 감정에 민감하고 사려 깊은 타입입니다. 자기 성찰이 강하고 타인의
          감정에 공감하는 능력이 뛰어납니다. 때로는 타인의 기분에 영향을 많이
          받을 수 있어 혼자만의 시간이 필요할 때도 있습니다. 글을 쓰는 행위나
          내면을 정리하는 루틴이 성향과 잘 맞으며, 감정을 정리할 때 마음의
          평화를 얻을 수 있습니다. 이러한 성향은 타인에게 위로를 주는 역할을
          하기도 합니다.
        </p>
      </div>

      <div class="medium_card">
        <h3>추천 행동</h3>
        <p>
          이번 주에는 감정을 글로 표현해보거나, 가까운 사람에게 편지를 써보는 걸
          추천드려요. 감정적 균형에 도움이 됩니다. 또한 나만의 루틴을 만들어보는
          것도 좋아요. 매일 같은 시간에 짧은 글쓰기, 명상, 산책 등을
          시도해보세요. 반복되는 자기 관리 활동은 내면의 안정감을 크게 높여줄 수
          있습니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { computed } from "vue";

const week = [
  { label: "월", written: true },
  { label: "화", written: true },
  { label: "수", written: false },
  { label: "목", written: true },
  { label: "금", written: false },
  { label: "토", written: false },
  { label: "일", written: true },
];

const writtenCount = computed(() => week.filter((d) => d.written).length);
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

.medium_card {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1.5px solid #5e4638;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.08);
  font-size: 15px;
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
</style>
