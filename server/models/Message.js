import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: String,
  username: String,
  date: String,
  userId: String,
});

const Message = mongoose.model("message", messageSchema);

export default Message;
