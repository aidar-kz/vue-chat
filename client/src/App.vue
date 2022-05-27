<template>
  <main class="container p-5"></main>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      messages: [],
      username: "",
      selected: 0,
      isReady: false,
      isTyping: false,
      userId: "",
      errorLoginMsg: "",
    };
  },
  methods: {
    joinToChat() {
      if (!this.username) {
        this.errorLoginMsg = "Введите имя пользователя";
      } else {
        this.$socket.emit("enterUsername", { username: this.username });
        this.username = "";
        this.isReady = true;
        this.userId = this.$socket.id;
      }
    },
  },
  mounted() {
    this.$socket.on("initChat", (data) => {
      this.messages = data.messages;
    });

    this.$socket.on("getUsers", (data) => {
      this.users = data;
    });

    this.$socket.on("newMessage", (data) => {
      this.messages.push(data);
    });

    this.$socket.on("isTyping", (data) => {
      this.isTyping = data;
    });

    this.$socket.on("stopTyping", () => {
      this.isTyping = false;
    });
  },
};
</script>

<style lang="scss" scoped></style>
