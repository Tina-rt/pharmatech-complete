<template>
    <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost">
            {{ selectedDisplayed }}
            <Icon name="mdi:chevron-down" size="20" />
        </div>
        <ul
            tabindex="0"
            class="dropdown-content menu bg-white z-[1] w-52 p-2 shadow"
        >
            <li v-for="option in props.options" @click="handleSelect(option)">
                <div href="">
                    {{ props.optionLabel ? option[props.optionLabel] : option }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    options: any[];
    optionValue?: string;
    optionLabel?: string;
    placeholder?: string;
}>();

const selected = defineModel<any>();
const selectedObj = ref<any>();

const emits = defineEmits(['change'])

const selectedDisplayed = computed(() => {
    // return selected;
    if (selected.value != undefined) {
        if (props.optionLabel && selectedObj.value) {
            return selectedObj.value[props.optionLabel];
        }else {return selected.value}
    } else {
        return props.placeholder;
    }
});

const handleSelect = (option: any) => {
    selected.value = props.optionValue ? option[props.optionValue] : option;
    selectedObj.value = option;
    console.log(selected.value);
    emits('change')
};
</script>

<style>
/* Add your custom styles here */
</style>
