<template>
  <div class="task-list">
    <div
      class="task-item_container"
      v-for="(task, index) in tasks"
      :key="index"
    >
      <div class="task-item" :class="{ completed: task.isCompleted }">
        <input
          type="checkbox"
          :checked="task.isCompleted"
          @change="$emit('toggle-task', index)"
        />
        <span>{{ task.title }}</span>
        <button class="delete-btn">✕</button>
      </div>
      <div class="subtask-list" v-if="task.subtasks.length">
        <div
          class="subtask-item"
          v-for="(subtask, subIndex) in task.subtasks"
          :key="subIndex"
          :class="{ completed: subtask.isCompleted }"
        >
          <input
            type="checkbox"
            :checked="subtask.isCompleted"
            @change="
              $emit('toggle-subtask', {
                taskIndex: index,
                subtaskIndex: subIndex,
              })
            "
          />
          <span>{{ subtask.title }}</span>
          <button class="delete-btn">✕</button>
        </div>
      </div>
      <div class="add-sub_task">
        <button class="add-btn">+</button>
        <input type="text" placeholder="Add a new task" />
      </div>
    </div>
    <div class="input-field">
      <input type="text" placeholder="Add a new task" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoTaskList",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-task", "toggle-subtask"],
};
</script>

<style lang="scss" scoped>
@import "@/styles/_task-list.scss";
</style>
