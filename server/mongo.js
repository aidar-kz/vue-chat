import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/vue-chat");

mongoose.connection.on("connected", () => {
  console.log("MongoDB подключен");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB переподключен");
});

mongoose.connection.on("error", () => {
  console.log("MongoDB ошибка подключения:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB отключен");
});
