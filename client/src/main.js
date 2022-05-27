import "bootstrap/dist/js/bootstrap.js";
import io from "socket.io-client";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// const url = "https://empty-ears-greet-37-99-41-82.loca.lt";
const url = "http://localhost:3000";
app.config.globalProperties.$socket = io(url);

app.mount("#app");
