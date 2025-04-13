<template>
  <div class="footer">
    <span>{{ tasksLeft }} left</span>
    <div class="tabs">
      <button class="active">All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoFooter",
  props: {
    tasksLeft: {
      type: String,
      default: "0/0",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_footer.scss";
</style>
