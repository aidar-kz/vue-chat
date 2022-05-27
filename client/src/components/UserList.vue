<template>
  <div class="card">
    <div class="card-header">
      <small>Онлайн:</small>
    </div>

    <div
      class="friend-drawer friend-drawer--onhover"
      v-for="user in users"
      :key="user.id"
    >
      <div class="text">
        <h6>{{ user.username }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
