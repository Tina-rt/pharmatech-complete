<template>
    <div class="p-4 flex flex-col gap-5">
      <h1>Editer produit</h1>
      <FormProduct :produit-to-edit="currentProduct" />
    </div>
</template>

<script lang="ts" setup>
import type { Produits } from '~/types/produits.model';


const route = useRoute();

const productId = ref<string>();
const currentProduct = ref<Produits>();

onMounted(() => {
    productId.value = route.params.id as string;
    getProduitById(+productId.value).then((data) => {
        console.log(data);
        currentProduct.value = data;
    });
});

</script>

<style></style>
