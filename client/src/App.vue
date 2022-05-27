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

      <div class="col-8 ps-0">
        <ChatPanel :messages="messages" :isTyping="isTyping" :userId="userId" />

        <MessageInput :username="username" />
      </div>
    </div>
  </main>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import UserList from "@/components/UserList.vue";
import ChatPanel from "@/components/ChatPanel.vue";
import MessageInput from "@/components/MessageInput.vue";

export default {
  components: { LoginForm, UserList, ChatPanel, MessageInput },
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

body {
  background: #3498db;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.container {
  margin: 60px auto;
  background: #fff;
  padding: 0 !important;
  border-radius: 7px;
}

.border-right {
  border-right: 1px solid #dee2e6 !important;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 40px;
}

.search-box {
  background: #fafafa;
  padding: 10px 13px;

  .input-wrapper {
    background: #fff;
    border-radius: 40px;

    i {
      color: grey;
      margin-left: 7px;
      vertical-align: middle;
    }
  }
}

input {
  border: none;
  border-radius: 30px;
  width: 80%;

  &::placeholder {
    color: #e3e3e3;
    font-weight: 300;
    margin-left: 20px;
  }

  &:focus {
    outline: none;
  }
}

.settings-tray {
  background: #eee;
  padding: 10px 15px;
  border-radius: 7px;

  .no-gutters {
    padding: 0;
  }

  &--right {
    float: right;

    i {
      margin-top: 10px;
      font-size: 25px;
      color: grey;
      margin-left: 14px;
      transition: 0.3s;

      &:hover {
        color: $blue;
        cursor: pointer;
      }
    }
  }
}

.friend-drawer {
  padding: 10px 15px;
  display: flex;
  vertical-align: baseline;
  background: #fff;
  transition: 0.3s ease;

  &--grey {
    background: #eee;
  }

  .text {
    margin-left: 12px;
    width: 70%;

    h6 {
      margin-top: 6px;
      margin-bottom: 0;
    }

    p {
      margin: 0;
    }
  }

  .time {
    color: grey;
  }

  &--onhover:hover {
    background: $blue;
    cursor: pointer;

    p,
    h6,
    .time {
      color: #fff !important;
    }
  }
}
</style>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css";
</style>
