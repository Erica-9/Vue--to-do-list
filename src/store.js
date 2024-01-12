import { createStore } from "vuex";
export const store = createStore({
	state() {
		return {
			tasks: [],
		};
	},
	getters: {
		tasksCount: (state) => {
			return state.tasks.length;
		},
	},
	mutations: {
		addTask(state, task) {
			state.tasks.push(task);
		},
	},
	actions: {
		addTask(context, task) {
			context.commit("addTask", task);
		},
	},
});
