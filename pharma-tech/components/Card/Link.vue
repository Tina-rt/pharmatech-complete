<template>
    <div
        class="card-link"
        :style="{
            backgroundColor: `var(${props.color}) !important`,
        }"
    >
        <div class="flex items-center gap-3">
            <Icon v-if="props.icon" :name="props.icon" size="60"/>
			<img :src="useRenderStatic().renderStatic(props.iconLink)" v-if="props.iconLink">
				
			</img>
            <h3>{{ props.title }}</h3>
        </div>
        <div class="btn btn-ghost"><Icon name="uil:angle-right" size="40"/></div>
    </div>
</template>

<script lang="ts" setup>
import { useRenderStatic } from '~/composables/renderStatic';

const props = defineProps<{
    title: string;
    icon?: string;
	iconLink?: string;
    link?: string;
    color?: string;
}>();


</script>

<style lang="scss" scoped>
.card-link {
    padding: 1rem;
    background-color: #bfe5c7;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
	aspect-ratio: 300/100;
	max-width: 400px;

	h3{
		font-size: 1.6rem;
		font-weight: bold;
		max-width: 140px;
	}
}
</style>
