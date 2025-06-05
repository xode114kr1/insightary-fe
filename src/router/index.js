import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView/HomeView.vue";
import LoginView from "@/views/LoginView/LoginView.vue";
import DiaryView from "@/views/DiaryView/DiaryView.vue";
import RegisterView from "@/views/RegisterView/RegisterView.vue";
import MainView from "@/views/MainView/MainView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import store from "@/store/index";
import CalendarView from "@/views/CalendarView/CalendarView.vue";

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
    meta: { requiresAuth: true },
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
    meta: { requiresAuth: true },
  },
  {
    path: "/calendar",
    name: "calendar",
    component: CalendarView,
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router;
