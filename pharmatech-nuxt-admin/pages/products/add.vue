<script lang="ts" setup>

</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-2xl">Ajouter un produit</h1>
        <div class="card bg-base-200 p-4 flex flex-col gap-4">
            <FormProduct />
        </div>
        <Toast />
    </div>
</template>

<style scoped>
.error {
    color: rgb(255, 75, 75);
}
</style>
