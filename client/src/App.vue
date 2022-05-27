<template>
  <main class="container p-5">
    <LoginForm
      v-if="!isReady"
      v-model:username="username"
      @submit="joinToChat"
      :errorLoginMsg="errorLoginMsg"
    />

    <div v-else class="row h-100 no-gutters">
      <div class="col-4 border-right pe-0">
        <UserList :users="users" />
      </div>

      <!-- <div class="col-8 ps-0">
        <ChatPanel
          :messages="messages"
          :isTyping="isTyping"
          :userId="userId"
          v-model:message="message"
        />

        <MessageInput :username="username" />
      </div> -->
    </div>
  </main>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import UserList from "@/components/UserList.vue";

export default {
  components: { LoginForm, UserList },
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

<style lang="scss">
@import "bootstrap/dist/css/bootstrap.css";
</style>
