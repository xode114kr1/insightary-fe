import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView/HomeView.vue";
import LoginView from "@/views/LoginView/LoginView.vue";
import DiaryView from "@/views/DiaryView/DiaryView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { hindHeader: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/diary",
    name: "diary",
    component: DiaryView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
