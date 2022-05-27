import express, { json, urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dateFormat from "dateformat";

import "./mongo.js";
import Message from "./models/Message.js";

const app = express();
const port = 3000;
const server = createServer(app);

const now = new Date();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

app.use(json());
app.use(urlencoded({ extended: false }));

server.listen(port, () => {
  console.log("Сервер слушает порт", port);
});

let users = [];
let messages = [];

Message.find((err, result) => {
  if (err) throw err;
  messages = result;
});

io.on("connection", (socket) => {
  socket.emit("initChat", { messages });

  socket.username = "Anonymous";

  const updateUsernames = () => {
    io.emit("getUsers", users);
  };

  socket.on("enterUsername", (user) => {
    socket.username = user.username;
    users.push({ id: socket.id, username: socket.username });
    updateUsernames();
    io.emit("userConnected", socket.username);
    console.log(`Пользователь ${socket.username} подключен`);
  });

  socket.on("newMessage", (data) => {
    const message = new Message({
      message: data.message,
      username: socket.username,
      date: dateFormat(now, "dd-mm-yyyy, HH:MM"),
      userId: socket.id,
    });

    message.save((err, result) => {
      if (err) throw err;
      messages.push(result);
      io.emit("newMessage", result);
    });
  });

  socket.on("isTyping", () => {
    socket.broadcast.emit("isTyping", socket.username);
  });

  socket.on("stopTyping", (data) => {
    socket.broadcast.emit("stopTyping", data);
  });

  socket.on("deleteOne", (data, err) => {
    Message.deleteOne({ _id: data._id });
    if (err) throw err;
  });

  socket.on("disconnect", () => {
    io.emit("userDisconnected", socket.username);

    users = users.filter((user) => user.id != socket.id);

    updateUsernames();
    console.log(`Пользователь ${socket.username} отключился`);
  });
});
