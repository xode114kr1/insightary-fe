import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView/HomeView.vue";
import LoginView from "@/views/LoginView/LoginView.vue";
import DiaryView from "@/views/DiaryView/DiaryView.vue";
import RegisterView from "@/views/RegisterView/RegisterView.vue";
import MainView from "@/views/MainView/MainView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

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
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/diary",
    name: "diary",
    component: DiaryView,
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFount",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
