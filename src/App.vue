<template>
	<div>
		<h1>Task List</h1>
		<input v-model="newTask" @keyup.enter="addTask" placeholder="Add a task..." />
		<ul>
			<li v-for="task in tasks">{{ task }}</li>
		</ul>
		<p>Total tasks: {{ tasksCount }}</p>
	</div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const store = useStore();
		const newTask = ref("");
		const addTask = () => {
			store.dispatch("addTask", newTask.value);
			newTask.value = "";
		};
		return {
			newTask,
			addTask,
			tasks: computed(() => store.state.tasks),
			tasksCount: computed(() => store.getters.tasksCount),
		};
	},
};
</script>
