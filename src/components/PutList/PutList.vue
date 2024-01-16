<template>
    <div>
        <input v-model="NewTask" @keyup.enter="AddTask" placeholder="輸入你的代辦事項..." class="ListInput" />
    </div>
</template>
<script>
//新增代辦清單
import { computed, ref } from "vue";
import { useStore } from "vuex";
import "./PutList.css";
export default {
    setup() {
        const store = useStore();
        const NewTask = ref("");
        const AddTask = () => {
            if (NewTask.value != "") {
                const list = { id: store.state.StartId++, task: NewTask.value, done: false };
                store.dispatch("AddTask", list);
                NewTask.value = "";
            }
        };
        return {
            NewTask,
            AddTask
        };
    }
};
</script>