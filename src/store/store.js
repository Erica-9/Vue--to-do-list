import { createStore } from "vuex";
export const store = createStore({
	state() {
		return {
			tasks: [{ id: 1, task: "打籃球", done: true }],
		};
	},
	getters: {
		tasksCount: (state) => {
			return state.tasks.length;
		},
	},
	mutations: {
		addTask(state, List) {
			state.tasks.push(List);
		},
		ChangeDone(state, id) {
			state.tasks.id.done = !state.tasks.id.done;
		},
	},
	actions: {
		addTask(context, List) {
			context.commit("addTask", List);
		},
	},
});
