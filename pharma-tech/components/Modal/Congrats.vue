<script lang="ts" setup>
const isOpen = ref(false);

const emits = defineEmits(['close'])

const openModal = () => {
    isOpen.value = true;
};

defineExpose({ openModal });
</script>

<template>
    <input
        type="checkbox"
        id="my_modal_6"
        class="modal-toggle"
        v-model="isOpen"
    />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <div
                class="flex flex-col justify-center mb-4 gap-4 items-center text-2xl text-center w-full font-bold"
            >
                <Icon name="mdi-check-circle" class="text-green-600 text-5xl" />
                <span>Merci pour votre commande !</span>
            </div>
            <p class="pt-7 text-center">
                Votre commande est en cours de traitement, on vous contactera
            </p>
            <div class="modal-action">
                <label for="my_modal_6" class="btn" @click="emits('close')">D'accord !</label>
            </div>
        </div>
    </div>
</template>
