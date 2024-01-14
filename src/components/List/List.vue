<template>
    <div class="ListLayout">
        <div class="ListButton">
            <button @click="ChangeCheck('all')">所有代辦清單</button>
            <button @click="ChangeCheck('NoCheck')">未完成</button>
            <button @click="ChangeCheck('Check')">已完成</button>
        </div>
        <div>
            <div>您未新增任何代辦清單</div>
            <ul>
                <li v-for="task in tasks " :class="{ CheckAnsLayout: task.done }" style="list-style-type:none"
                    :key="task.id">
                    <div>
                        <input type="checkbox" v-model="task.done" :class="{ CheckAns: task.done }">
                        <p :class="{ done: task.done }">{{ task.task }}</p>
                    </div>
                    <div :class="{ CheckAns: !task.done }">已完成</div>
                    <button :class="{ CheckAns: task.done }" class="DeleteList" @click="DeleteList(task.id)">×</button>

                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        const Check = ref("all")
        console.log(store);
        const tasks = computed(() => {
            return Check.value == "NoCheck"
                ? store.state.tasks.filter(i => !i.done)
                : Check.value == "Check"
                    ? store.state.tasks.filter(i => i.done)
                    : store.state.tasks
        })
        const CountList = function () {
            this.tasks.value.done.sort((a, b) => a - b);
        }
        console.log(tasks.value); //這裡
        function ChangeCheck(Change) {
            Check.value = Change
            console.log(tasks)
        }
        function DeleteList(id) {
            store.dispatch("DeleteList", id);
            console.log(store)
        }
        console.log(tasks)
        return {
            tasks,
            ChangeCheck,
            DeleteList
        };
    }
};
</script>