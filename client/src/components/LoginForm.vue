<template>
  <form @submit.prevent="joinToChat">
    <h4>Добро пожаловать!</h4>

    <div class="mt-3">
      <label class="form-label">Введите ник:</label>
      <input
        type="text"
        class="form-control"
        :value="username"
        @input="$emit('update:username', $event.target.value)"
      />
    </div>

    <div class="mt-3">
      <button class="btn btn-success" type="submit">Присоединиться</button>
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
};
</script>

<style lang="scss" scoped></style>
