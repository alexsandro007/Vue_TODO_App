<template>
  <div class="footer">
    <span>{{ tasksLeft }}/{{ getTaskLength }} left</span>
    <div class="tabs">
      <button
        :class="{ active: getTypeOfTasks === 'all' }"
        @click="displaySpecificTasks('all')"
      >
        All
      </button>
      <button
        :class="{ active: getTypeOfTasks === 'active' }"
        @click="displaySpecificTasks('active')"
      >
        Active
      </button>
      <button
        :class="{ active: getTypeOfTasks === 'completed' }"
        @click="displaySpecificTasks('completed')"
      >
        Completed
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TodoFooter",
  computed: {
    ...mapGetters(["getTaskLength", "tasksLeft", "getTypeOfTasks"]),
  },
  methods: {
    ...mapMutations(["displaySpecificTasks"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_footer.scss";
</style>
