import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import setAtuhHeader from "./utils/setAuthHeader";

if (localStorage.jwtToken) {
  setAtuhHeader(localStorage.jwtToken); // Check if there's a token on local storage, if is true, call a function that set token as "persistent"
} else {
  setAtuhHeader(false);
}

createApp(App).use(router).mount("#app");
