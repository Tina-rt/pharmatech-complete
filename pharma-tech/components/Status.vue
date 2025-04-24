<template>
    <div class="status status-0" :class="{ 'status-0': props.status == 0 }">
        {{
            props.status != undefined
                ? useConstants().ORDER_STATUS[props.status].name
                : props.statusMessage
        }}
    </div>
</template>

<script lang="ts" setup>
import type { Status } from "@/types/status.model";

const props = defineProps<{
    status?: number;
    statusMessage?: string;
}>();
</script>

<style scoped lang="scss">
.status {
    padding: 0.5rem;
    min-width: 130px;
    width: 130px;
    max-height: 2rem;
    height: fit-content;
    font-size: 0.8rem;
    display: grid;
    place-items: center;
    border-radius: 0.4rem;
}

.status-0 {
    color: #c03d05;
    background: #ffb570;
}
</style>
