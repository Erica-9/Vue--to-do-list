<template>
	<div class="ListLayout">
		<div class="List">
			<PutList />
			<List />
		</div>
	</div>
</template>
<script>
import List from "./components/List/List.vue";
import PutList from "./components/PutList/PutList.vue";
export default {
	components: { PutList, List },
};
</script>
