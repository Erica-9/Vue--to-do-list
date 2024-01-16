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
			//加入代辦清單
			state.tasks.push(List);
		},
		DeleteList(state, id) {
			//刪除特定代辦清單
			const DeleteData = state.tasks.findIndex((item) => item.id === id);
			if (DeleteData !== -1) {
				state.tasks.splice(DeleteData, 1);
			}
		},
		SortTask(state, List) {
			//排序(完成的顯示在最下方)
			state.tasks = List.sort((a, b) => a.done - b.done);
		},
		ClearList(state) {
			//清空代辦清單
			state.tasks.splice(0, state.tasks.length);
		},
	},
	actions: {
		AddTask(context, List) {
			//加入代辦清單
			context.commit("AddTask", List);
		},
		DeleteList(context, id) {
			//刪除特定代辦清單
			context.commit("DeleteList", id);
		},
		SortTask(context, List) {
			//排序(完成的顯示在最下方)
			context.commit("SortTask", List);
		},
	},
});
