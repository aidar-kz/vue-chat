<template>
  <div class="chat-panel" v-if="messages" ref="chatArea">
    <div ref="scrollHeight">
      <div class="row no-gutters" v-for="message in messages">
        <div class="chat-bubble">
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
    message: {
      type: String,
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

<style lang="scss" scoped></style>
