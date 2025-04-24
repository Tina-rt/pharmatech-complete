<template>
    <div class="px-9">
        <h2 class="form-title">Adresse de livraison</h2>
        <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
                <input
                    v-model="adresseDefault"
                    :value="true"
                    class="radio"
                    type="radio"
                    name="keepaddress"
                    id="address"
                />
                <label for="keepaddress" class="radiolabel"
                    >Identique à l'adresse au dessus</label
                >
            </div>
            <div class="flex items-center gap-2">
                <input
                    v-model="adresseDefault"
                    :value="false"
                    class="radio"
                    type="radio"
                    name="keepaddress"
                    id="address"
                />
                <label for="keepaddress" class="radiolabel"
                    >Ajouter une nouvelle adresse</label
                >
            </div>
            <TextInput v-model="newAdresse" v-if="!adresseDefault" :disabled="adresseDefault" class="w-fit ml-6" placeholder="Adresse de livraison" />
        </div>
    </div>
    <div class="px-9">
        <h2 class="form-title">Programmer une livraison</h2>
        <div class="flex gap-3">
            <div class="flex flex-col gap-2">
                <label for="">Date et heure de livraison</label>
                <VueDatePicker v-model="shippingDate" />
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>

import VueDatePicker from "@vuepic/vue-datepicker";

const shippingDate = ref(new Date());

const adresseDefault = ref(true)
const newAdresse = ref('');

const shippingMethods = ref([
    {
        label: "Tarif Forfaitaire",
        description: "Livraison forfaitaire standard pour tous les articles",
        price: 3000,
    },
    {
        label: "Livraison Accélérée",
        description:
            "Livraison accélérée pour recevoir l'envoi en un jour ou deux",
        price: 8000,
    },
    {
        label: "Livraison en 24 Heures",
        description:
            "Une option coûteuse pour recevoir l'envoi le jour ouvrable suivant",
        price: 10000,
    },
]);

defineExpose({
    adresseDefault,
    newAdresse,
    shippingDate
})

</script>

<style></style>
