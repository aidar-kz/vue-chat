<template>
  <div class="chat-panel" v-if="messages" ref="chatArea">
    <div ref="scrollHeight">
      <div
        v-for="message in messages"
        class="row no-gutters"
        :class="{ 'justify-content-end': message.userId === userId }"
      >
        <div
          class="chat-bubble"
          :class="message.userId === userId ? 'right' : 'left'"
        >
          {{ message.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
    isTyping: {
      type: [Boolean, String],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chatArea: null,
      scrollHeight: null,
    };
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.chatArea.scrollTo({
        behavior: "smooth",
        top: this.$refs.scrollHeight.clientHeight,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.chat-panel {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}

.chat-bubble {
  display: inline-block;
  padding: 10px 14px;
  max-width: 80%;
  background: #eee;
  margin: 10px 30px;
  border-radius: 9px;
  position: relative;
  animation: fadeIn 1s ease-in;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom: 0;
    margin-top: -10px;
  }
}

.left {
  &:after {
    left: 0;
    border-right-color: #eee;
    border-left: 0;
    margin-left: -20px;
  }
}

.right {
  background: $blue;
  color: #fff;

  &:after {
    right: 0;
    border-left-color: $blue;
    border-right: 0;
    margin-right: -20px;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
