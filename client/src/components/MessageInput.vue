<template>
  <form @submit.prevent="sendMessage">
    <div class="chat-box-tray">
      <i class="material-icons">sentiment_very_satisfied</i>
      <input type="text" v-model="message" placeholder="Введите сообщение" />

      <i class="material-icons">mic</i>

      <button class="btn btn-text" type="submit">
        <i class="material-icons">send</i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  watch: {
    message(newValue) {
      newValue
        ? this.$socket.emit("isTyping", this.username)
        : this.$socket.emit("stopTyping");
    },
  },
  methods: {
    sendMessage() {
      this.message = this.message.trim();

      if (this.message.length > 0) {
        this.$socket.emit("newMessage", {
          username: this.username,
          message: this.message,
        });

        this.message = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-box-tray {
  background: #eee;
  display: flex;
  padding: 10px 15px;
  align-items: center;
  bottom: 0;
}

input {
  margin: 0 10px;
  padding: 6px;
}

i {
  color: grey;
  font-size: 30px;
  vertical-align: middle;

  &:last-of-type {
    margin-left: 25px;
  }
}

.btn {
  &:hover {
    cursor: pointer;
    i {
      color: green;
    }
  }
}
</style>
