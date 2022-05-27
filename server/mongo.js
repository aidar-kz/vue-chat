import mongoose from "mongoose";

// const mongoUrl = "https://gentle-mice-add-37-99-41-82.loca.lt/vue-chat";
const mongoUrl = "mongodb://localhost:27017/vue-chat";
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("MongoDB подключен");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB переподключен");
});

mongoose.connection.on("error", (error) => {
  console.log("MongoDB ошибка подключения:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB отключен");
});
