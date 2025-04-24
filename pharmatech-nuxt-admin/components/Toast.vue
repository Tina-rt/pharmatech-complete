<template>
    <div class="toast toast-center" v-if="show">
		<div  class="alert" :class="`alert-${props.severity}`">
			<slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    severity?: 'info' | 'success' | 'warning' | 'error' | string;
    content?: string;
}>();

const show = defineModel({type: Boolean, default: false})

watch(show, (newval) => {
	if (newval){
		setTimeout(() => {
			show.value = false;
		}, 3000);
	}
})

</script>

<style></style>
