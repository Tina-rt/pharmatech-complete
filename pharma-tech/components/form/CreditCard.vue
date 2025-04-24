<template>
    <div class="w-full p-2">
        <CreditCardList class="py-3" />
        <div class="form-credit-card flex flex-col gap-2">
            <label class="input input-bordered flex items-center gap-2">
                <input type="text" class="grow" placeholder="Nom de la carte" />
                <Icon class="text-secondary" name="mdi-bank" />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    class="grow"
                    placeholder="Numéro de la Carte 0000 0000 0000"
                />
                <Icon class="text-secondary" name="mdi-credit-card" />
            </label>
            <div class="flex w-full gap-2">
                <label class="input input-bordered flex items-center gap-2 w-full">
                    <input
                        type="text"
                        class="grow" 
                        placeholder="Date Exp (MM/DD)"
                    />
                    <Icon class="text-secondary" name="mdi-calendar" />
                </label>
                <label class="input input-bordered flex items-center gap-2 w-full">
                    <input
                        type="text"
                        class="grow"
                        placeholder="Code de Sécurité"
                    />
                    <Icon class="text-secondary" name="mdi-lock" />
                </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
