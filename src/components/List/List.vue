<template>
    <div class="ListLayout">
        <div class="ListButton">
            <button @click="ChangeCheck('all')">全部</button>
            <button @click="ChangeCheck('NoCheck')">進行中</button>
            <button @click="ChangeCheck('Check')">已完成</button>
        </div>
        <div>
            <div>您未新增任何代辦清單</div>
            <ul>
                <li v-for="task in tasks " :class="{ FinishList: task.done }" style="list-style-type:none" :key="task.id">
                    <div>
                        <input type="checkbox" v-model="task.done" :class="{ ListEnd: task.done }">
                        <p :class="{ done: task.done }">{{ task.task }}</p>
                    </div>
                    <div :class="{ ListEnd: !task.done }">已完成</div>
                    <button :class="{ ListEnd: task.done }" class="DeleteList" @click="DeleteList(task.id)">×</button>
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
        const Check = ref("all")
        const tasks = computed(() => {
            return Check.value == "NoCheck"
                ? store.state.tasks.filter(i => !i.done)
                : Check.value == "Check"
                    ? store.state.tasks.filter(i => i.done)
                    : store.state.tasks
        })
        function ChangeCheck(Change) {
            Check.value = Change
            // console.log(tasks)
        }
        function DeleteList(id) {
            store.dispatch("DeleteList", id);
            // console.log(store)
        }
        watch(store.state.tasks, (newValue) => {
            store.dispatch("sortTask", newValue);
        })
        return {
            tasks,
            ChangeCheck,
            DeleteList
        };
    }
};
</script>