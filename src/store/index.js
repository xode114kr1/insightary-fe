import router from "@/router";
import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: !!sessionStorage.getItem("token"),
    user: null,
  },
  getters: {},
  mutations: {
    setLogin(state, payload) {
      state.isLogin = true;
      state.user = payload;
    },
    getLogout(state) {
      state.isLogin = false;
      state.user = null;
      sessionStorage.removeItem("token");
      router.push("/");
    },
  },
  actions: {},
  modules: {},
});
