<template>
    <div>
        <input v-model="newTask" @keyup.enter="addTask" placeholder="輸入你的代辦事項..." class="ListInput" />
    </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import "./PutList.css";
export default {
    setup() {
        const store = useStore();
        const newTask = ref("");
        const addTask = () => {
            if (newTask.value == "") {

            } else {
                const list = { id: store.state.StartId++, task: newTask.value, done: false };
                store.dispatch("addTask", list);
                newTask.value = "";
            }

        };
        return {
            newTask,
            addTask
        };
    }
};
</script>