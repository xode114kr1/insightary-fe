import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VCalendar, {});
app.mount("#app");
