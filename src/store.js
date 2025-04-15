import Vuex from "vuex";

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to LocalStorage:", error);
  }
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error("Error loading from LocalStorage:", error);
    return defaultValue;
  }
};

export default function createStore() {
  const initialTasks = [
    {
      id: 1,
      title: "Task 1",
      isCompleted: false,
      subtasks: [
        { id: 1, title: "Subtask 1", isCompleted: false },
        { id: 2, title: "Subtask 2", isCompleted: true },
      ],
    },
    {
      id: 2,
      title: "Task 2",
      isCompleted: false,
      subtasks: [],
    },
  ];

  const initialTypeOfTasks = "all";

  return new Vuex.Store({
    state: {
      tasks: loadFromLocalStorage("tasks", initialTasks),
      typeOfTasks: loadFromLocalStorage("typeOfTasks", initialTypeOfTasks),
    },
    mutations: {
      addTask(state, taskTitle) {
        if (
          !taskTitle ||
          typeof taskTitle !== "string" ||
          taskTitle.trim() === ""
        ) {
          console.warn("Invalid task title:", taskTitle);
          return;
        }
        state.tasks.push({
          id: Math.max(0, ...state.tasks.map((task) => task.id)) + 1,
          title: taskTitle.trim(),
          isCompleted: false,
          subtasks: [],
        });
        saveToLocalStorage("tasks", state.tasks);
      },
      addSubtask(state, { taskId, subtaskTitle }) {
        if (
          !subtaskTitle ||
          typeof subtaskTitle !== "string" ||
          subtaskTitle.trim() === ""
        ) {
          console.warn("Invalid subtask title:", subtaskTitle);
          return;
        }
        const task = state.tasks.find((task) => task.id === taskId);
        if (!task) {
          console.warn("Task not found:", taskId);
          return;
        }
        task.subtasks.push({
          id: Math.max(0, ...task.subtasks.map((subtask) => subtask.id)) + 1,
          title: subtaskTitle.trim(),
          isCompleted: false,
        });
        task.isCompleted = task.subtasks.every(
          (subtask) => subtask.isCompleted
        );
        saveToLocalStorage("tasks", state.tasks);
      },
      toggleTask(state, taskId) {
        const task = state.tasks.find((task) => task.id === taskId);
        task.isCompleted = !task.isCompleted;
        task.subtasks.forEach((subtask) => {
          subtask.isCompleted = task.isCompleted;
        });
        saveToLocalStorage("tasks", state.tasks);
      },
      toggleSubtask(state, { taskId, subtaskId }) {
        const task = state.tasks.find((task) => task.id === taskId);
        const subtask = task.subtasks.find(
          (subtask) => subtask.id === subtaskId
        );
        subtask.isCompleted = !subtask.isCompleted;
        task.isCompleted = task.subtasks.every(
          (subtask) => subtask.isCompleted
        );
        saveToLocalStorage("tasks", state.tasks);
      },
      deleteTask(state, taskId) {
        state.tasks = state.tasks.filter((task) => task.id !== taskId);
        saveToLocalStorage("tasks", state.tasks);
      },
      deleteSubtask(state, { taskId, subtaskId }) {
        const task = state.tasks.find((task) => task.id === taskId);
        task.subtasks = task.subtasks.filter(
          (subtask) => subtask.id !== subtaskId
        );
        if (task.subtasks.length === 0) {
          task.isCompleted = false;
          task.subtasks = [];
        } else {
          task.isCompleted = task.subtasks.every(
            (subtask) => subtask.isCompleted
          );
        }
        saveToLocalStorage("tasks", state.tasks);
      },
      displaySpecificTasks(state, value) {
        state.typeOfTasks = value;
        saveToLocalStorage("typeOfTasks", state.typeOfTasks);
      },
    },
    getters: {
      tasks(state) {
        if (state.typeOfTasks === "active") {
          return state.tasks.filter((task) => !task.isCompleted);
        } else if (state.typeOfTasks === "completed") {
          return state.tasks.filter((task) => task.isCompleted);
        }
        return state.tasks;
      },
      getTaskLength(state) {
        return state.tasks.length;
      },
      tasksLeft(state) {
        return state.tasks.filter((task) => !task.isCompleted).length;
      },
      getTypeOfTasks(state) {
        return state.typeOfTasks;
      },
    },
  });
}
