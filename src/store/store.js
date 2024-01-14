import { createStore } from "vuex";
export const store = createStore({
	state() {
		return {
			tasks: [],
			StartId: 1,
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
		DeleteList(state, id) {
			const DeleteData = state.tasks.findIndex((item) => item.id === id);
			if (DeleteData !== -1) {
				state.tasks.splice(DeleteData, 1);
			}
		},
		sortTask(state, List) {
			state.tasks = List.sort((a, b) => a.done - b.done);
		},
	},
	actions: {
		addTask(context, List) {
			context.commit("addTask", List);
		},
		DeleteList(context, id) {
			context.commit("DeleteList", id);
		},
		sortTask(context, List) {
			context.commit("sortTask", List);
		},
	},
});
