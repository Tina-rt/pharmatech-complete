<template>
    <div class="input-number flex items-center justify-between">
        <div class="btn-input" @click="minus"><Icon name="mdi:minus" /></div>
        <input class="value" type="number" v-model="value" />
        <div class="btn-input" @click="add"><Icon name="mdi:plus" /></div>
    </div>
</template>

<script lang="ts" setup>

const value: Ref<number> = defineModel<number>({
    default: 0,
});

const props = defineProps<{
    max?: number;
    min?: number;
}>();
const emit = defineEmits<{
    (e: 'change'): void;
}>();



const add = () => {
    if (props.max && value.value >= props.max){
        return;
    }
    value.value++;
    emit('change');
};

const minus = () => {
    if (value.value == 0 || (props.min && value.value <= props.min)){
        return;
    }
    value.value--;
    emit('change');

};

watch(value, () => {
    if (typeof value.value == 'string'){
        value.value = 0;
    }
});
</script>

<style lang="scss" scoped>
.input-number {
    background-color: #d9d9d9;
    width: 200px;
    max-width: 200px !important;
    font-weight: 700;
    border-radius: 12px;
}

.value,
.btn-input {
    padding: 10px;
}

.value {
    width: 100%;
    background-color: #d9d9d9;
    text-align: center;
    outline: none;
    -webkit-appearance: none; /* Safari */
    -moz-appearance: none; /* Firefox */
    appearance: none;
}
.value:focus {
    outline: none;
    -webkit-appearance: none; /* Safari */
    -moz-appearance: none; /* Firefox */
    appearance: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

.btn-input {
    display: flex;
    justify-content: center;
    justify-items: center;
    padding-inline: 20px;
    cursor: pointer;
}
</style>
