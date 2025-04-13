<template>
  <div id="app">
    <div class="todo-container">
      <todo-header />
      <todo-task-list
        :tasks="tasks"
        @toggle-task="toggleTask"
        @toggle-subtask="toggleSubtask"
      />
      <todo-footer :tasks-left="tasksLeft" />
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
  data() {
    return {
      tasksLeft: "1/3",
      tasks: [
        {
          title: "Task 1",
          isCompleted: true,
          subtasks: [
            { title: "Subtask 1", isCompleted: false },
            { title: "Subtask 2", isCompleted: true },
            { title: "Subtask 3", isCompleted: false },
          ],
        },
        {
          title: "Task 2",
          isCompleted: false,
          subtasks: [],
        },
        {
          title: "Task 3",
          isCompleted: false,
          subtasks: [],
        },
      ],
    };
  },
  methods: {
    toggleTask(taskIndex) {
      this.tasks[taskIndex].isCompleted = !this.tasks[taskIndex].isCompleted;
    },
    toggleSubtask({ taskIndex, subtaskIndex }) {
      this.tasks[taskIndex].subtasks[subtaskIndex].isCompleted =
        !this.tasks[taskIndex].subtasks[subtaskIndex].isCompleted;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
