import "bootstrap/dist/js/bootstrap.js";
import io from "socket.io-client";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.config.globalProperties.$socket = io("http://localhost:3000");

app.mount("#app");
