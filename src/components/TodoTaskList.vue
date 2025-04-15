<template>
  <div class="task-list">
    <h1 class="task-list__title" v-if="tasks.length === 0">
      Your list is empty
    </h1>
    <div class="task-item_container" v-for="task in tasks" :key="task.id">
      <div class="task-item" :class="{ completed: task.isCompleted }">
        <input
          type="checkbox"
          :checked="task.isCompleted"
          @change="toggleTask(task.id)"
        />
        <span>{{ task.title }}</span>
        <button class="delete-btn" @click="deleteTask(task.id)">✕</button>
      </div>
      <div class="subtask-list" v-if="task.subtasks.length">
        <div
          class="subtask-item"
          v-for="subtask in task.subtasks"
          :key="subtask.id"
          :class="{ completed: subtask.isCompleted }"
        >
          <input
            type="checkbox"
            :checked="subtask.isCompleted"
            @change="
              toggleSubtask({
                taskId: task.id,
                subtaskId: subtask.id,
              })
            "
          />
          <span>{{ subtask.title }}</span>
          <button
            class="delete-btn"
            @click="deleteSubtask({ taskId: task.id, subtaskId: subtask.id })"
          >
            ✕
          </button>
        </div>
      </div>
      <div class="add-sub_task">
        <button
          class="add-btn add-btn--subtask"
          @click="addNewSubtask(task.id)"
        >
          +
        </button>
        <input
          type="text"
          placeholder="Add a new subtask"
          v-model="subtaskInputs[task.id]"
          @keyup.enter="addNewSubtask(task.id)"
        />
      </div>
    </div>
    <div class="input-field">
      <input
        type="text"
        placeholder="Add a new task"
        v-model="newTaskTitle"
        @keyup.enter="addNewTask"
      />
      <button
        v-if="newTaskTitle.trim()"
        class="add-btn add-btn--task"
        @click="addNewTask"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TodoTaskList",
  data() {
    return {
      newTaskTitle: "",
      subtaskInputs: {},
    };
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    ...mapMutations([
      "addTask",
      "addSubtask",
      "toggleTask",
      "toggleSubtask",
      "deleteTask",
      "deleteSubtask",
    ]),
    addNewTask() {
      if (this.newTaskTitle.trim()) {
        this.addTask(this.newTaskTitle);
        this.newTaskTitle = "";
      }
    },
    addNewSubtask(taskId) {
      const subtaskTitle = (this.subtaskInputs[taskId] || "").trim();
      if (subtaskTitle) {
        this.addSubtask({ taskId, subtaskTitle });
        this.$set(this.subtaskInputs, taskId, "");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_task-list.scss";
</style>
