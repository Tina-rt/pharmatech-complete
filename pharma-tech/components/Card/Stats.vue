<template>
    <div class="card-stats" :style="{
		backgroundColor: `var(${props.color}) !important`
	}">
        <div class="flex items-center gap-3">
			<div class="icon">
				<Icon v-if="props.icon" :name="props.icon" size="30" />

			</div>
            <img
                :src="useRenderStatic().renderStatic(props.iconLink)"
                v-if="props.iconLink"
            />
			<h3>{{ props.number }}</h3>
        </div>
		<h3>{{ props.title }}</h3>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string;
    number?: string;
    icon?: string;
    iconLink?: string;
    link?: string;
    color?: string;
}>();
</script>

<style lang="scss" setup >
.card-stats {
	padding: 1rem;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-between;
	aspect-ratio: 305/181;
	max-width: 400px;
	min-width: 300px;

	@media screen and (max-width: 786px) {
		min-width: 100%;
		
	}
	.icon{
		background-color: white;
		border-radius: 10px;
		padding: 0.3rem;
		display: grid;
		place-items: center;
	}
	h3 {
		font-size: 1.6rem;
		font-weight: bold;
		max-width: 140px;
	}
}

</style>
