<template>
    <div class="ListLayout">
        <div class="ListButton">
            <div>
                <button @click="FilterList('All')" :class="{ FilterButtom: FilterButtom('All') }"
                    class="OtherButton">全部</button>
                <button @click="FilterList('NoCheck')" :class="{ FilterButtom: FilterButtom('NoCheck') }"
                    class="OtherButton">進行中</button>
            </div>
            <button @click="FilterList('Check')" :class="{ FilterFinishButtom: FilterButtom('Check') }"
                class="FinishButton">已完成</button>
        </div>
        <div>
            <ul>
                <li v-if="Length === 0">您未新增任何代辦清單</li>
                <li v-for="List in Lists " :class="{ FinishList: List.done }" :key="List.id">
                    <div class="ListContent">
                        <input type="checkbox" v-model="List.done" :class="{ ListEnd: List.done }">
                        <p :class="{ done: List.done }">{{ List.task }}</p>
                    </div>
                    <div :class="{ ListEnd: !List.done }" class="FilishToDo">√</div>
                    <button :class="{ ListEnd: List.done }" class="DeleteList" @click="DeleteList(List.id)">×</button>
                </li>
            </ul>
        </div>
        <div class="ClearButton">
            <button class="ClearList" @click="ClearList">清除所有任務</button>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import "./List.css"
export default {
    setup() {
        const store = useStore();
        const ListCheck = ref("All")
        const Lists = computed(() => {
            //篩選要顯示的清單
            return ListCheck.value == "NoCheck"
                ? store.state.tasks.filter(i => !i.done)
                : ListCheck.value == "Check"
                    ? store.state.tasks.filter(i => i.done)
                    : store.state.tasks
        })
        const Length = computed(() => {
            //有無代辦清單的判斷依據
            return store.getters.TasksCount
        })
        function FilterList(Change) {
            //完成代辦清單
            ListCheck.value = Change
            // console.log(tasks)
        }
        function FilterButtom(Filter) {
            //指定現在要篩選的代辦清單進ref
            // console.log(ListCheck.value == Filter)
            return ListCheck.value == Filter
        }
        function DeleteList(id) {
            //刪除這筆代辦清單
            store.dispatch("DeleteList", id);
            // console.log(store)
        }
        function ClearList() {
            // 清空
            store.commit('ClearList');
        }
        console.log(store.state.tasks)
        watch(store.state.tasks, (newValue) => {
            // 是否重新排序的監聽
            store.dispatch("SortTask", newValue);
            console.log(store.state.tasks)
        })
        return {
            Lists,
            Length,
            FilterButtom,
            FilterList,
            DeleteList,
            ClearList
        };
    }
};
</script>