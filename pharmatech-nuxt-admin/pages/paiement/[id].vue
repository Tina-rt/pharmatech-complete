<script lang="ts" setup>
import type { MethodePaiement } from '~/types/methodePaiement.models';

const route = useRoute();

const toEdit = ref<MethodePaiement>();

const errorMsg = ref('Methode de paiement introuvable');
const error = ref(false);

onMounted(async ()=>{
    const id = route.params.id;

    const res = await getMethodPaiementById(+id);
    if (res) {
        toEdit.value = res;
    }else{
        error.value = true;
    }
})

</script>


<template>
    <div class="p-4">
        <h1 class="text-xl">Modifier le methode de paiement</h1>
        <div v-if="!error">
            <FormPaiement :to-edit="toEdit" />
        </div>
        <div v-else class="text-red-500 w-full text-center text-2xl">
            {{ errorMsg }}
        </div>
    </div>
</template>