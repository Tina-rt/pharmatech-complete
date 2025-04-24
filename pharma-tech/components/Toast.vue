<template>
    <div v-if="toast" class="toast toast-end">
        <div class="alert" :class="['alert-' + variant]">
            <span class="flex items-center"><Icon :name="icon" /></span>
            <span>{{ title }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
const toast = ref(false);

const title = ref("Hello, World!");
const desc = ref("This is a toast message");
const icon = ref("mdi:check-circle");
const variant = ref("success");

const show = (
    title_: string,
    desc_?: string,
    icon_?: string,
    variant_?: string
) => {
    title.value = title_;
    desc.value = desc_ ?? "";
    variant.value = variant_ ?? "info";
    icon.value = icon_ ?? "mdi:check-circle";
    toast.value = true;
    setTimeout(() => {
        toast.value = false;
    }, 3000);
};

defineExpose({
    show,
});
</script>

<style></style>
