<template>
    <div class="ListLayout">
        <div class="ListButton">
            <div>
                <button @click="FilterList('all')" :class="{ FilterButtom: FilterButtom('all') }"
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
                <li v-for="List in Lists " :class="{ FinishList: List.done }" style="list-style-type:none" :key="List.id">
                    <div>
                        <input type="checkbox" v-model="List.done" :class="{ ListEnd: List.done }">
                        <p :class="{ done: List.done }">{{ List.task }}</p>
                    </div>
                    <div :class="{ ListEnd: !List.done }" class="FilishToDo">√</div>
                    <button :class="{ ListEnd: List.done }" class="DeleteList" @click="DeleteList(List.id)">×</button>
                </li>
            </ul>
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
        const ListCheck = ref("all")
        const Lists = computed(() => {
            return ListCheck.value == "NoCheck"
                ? store.state.tasks.filter(i => !i.done)
                : ListCheck.value == "Check"
                    ? store.state.tasks.filter(i => i.done)
                    : store.state.tasks
        })
        const Length = computed(() => {
            return store.getters.tasksCount
        })
        function FilterList(Change) {
            ListCheck.value = Change
            // console.log(tasks)
        }
        function FilterButtom(Filter) {
            console.log(ListCheck.value == Filter)
            return ListCheck.value == Filter
        }
        function DeleteList(id) {
            store.dispatch("DeleteList", id);
            // console.log(store)
        }
        watch(store.state.tasks, (newValue) => {
            store.dispatch("sortTask", newValue);
        })
        return {
            Lists,
            Length,
            FilterButtom,
            FilterList,
            DeleteList
        };
    }
};
</script>