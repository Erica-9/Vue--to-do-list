import { createStore } from "vuex";
export const store = createStore({
	state() {
		return {
			tasks: [],
			StartId: 1,
		};
	},
	getters: {
		TasksCount: (state) => {
			return state.tasks.length;
		},
	},
	mutations: {
		AddTask(state, List) {
			state.tasks.push(List);
		},
		DeleteList(state, id) {
			const DeleteData = state.tasks.findIndex((item) => item.id === id);
			if (DeleteData !== -1) {
				state.tasks.splice(DeleteData, 1);
			}
		},
		SortTask(state, List) {
			state.tasks = List.sort((a, b) => a.done - b.done);
		},
		ClearList(state) {
			state.tasks.splice(0, state.tasks.length);
		},
	},
	actions: {
		AddTask(context, List) {
			context.commit("AddTask", List);
		},
		DeleteList(context, id) {
			context.commit("DeleteList", id);
		},
		SortTask(context, List) {
			context.commit("SortTask", List);
		},
	},
});
