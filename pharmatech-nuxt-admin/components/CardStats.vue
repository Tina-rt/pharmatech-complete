<template>
    <div class="card main-card bg-base-100">
        <div class="flex gap-2">
            <div class="amount">{{ props.amount }}</div>
            <div class="units">{{ props.unit }}</div>
        </div>
        <div class="subtitle">{{ props.subtitle }}</div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    amount?: string | number;
    unit?:string;
    subtitle?: string;
}>();
</script>

<style lang="scss" scoped>
.main-card {
    padding: 2rem;
    min-width: 13rem;
    width: 18rem;
    aspect-ratio: 3/1;
    max-width: 18rem;
    display: flex;
    flex-direction: column;
    .amount {
        font-size: 2rem;
        font-weight: bold;
    }
    .subtitle {
        font-size: 0.8rem;
    }
}
</style>
