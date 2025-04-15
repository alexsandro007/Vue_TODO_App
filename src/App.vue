<template>
  <div id="app">
    <div class="todo-container">
      <todo-header />
      <todo-task-list />
      <todo-footer />
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoTaskList from "./components/TodoTaskList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  name: "App",
  components: {
    TodoHeader,
    TodoTaskList,
    TodoFooter,
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
