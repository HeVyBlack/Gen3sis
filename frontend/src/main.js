import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import setAtuhHeader from "./utils/setAuthHeader";

if (localStorage.jwtToken) {
  setAtuhHeader(localStorage.jwtToken);
} else {
  setAtuhHeader(false);
}

createApp(App).use(router).mount("#app");
