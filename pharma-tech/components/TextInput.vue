<template>
    <input
        :disabled="props.disabled"
        :type="props.type"
        :name="props.name"
        :id="props.id"
        :placeholder="props.placeholder"
        class="input input-bordered"
        :class="{disabled: props.disabled}"
        v-model="model"
    />
</template>

<script lang="ts" setup>
const props = defineProps<{
    name?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}>();

const model = defineModel()

</script>

<style></style>
