<template>
    <div
        class="w-full py-5 px-10 flex flex-col gap-6"
        v-if="currentProduit && !isLoading"
    >
        <SectionProduitsDetails :produit="currentProduit" />
        <div class="my-4">
            <SectionDescriptionProduct :produit="currentProduit" />
        </div>
        <div class="new-products">
            <div class="title-products w-full flex justify-between">
                <h2 class="text-2xl font-bold">Nouveaux Produits</h2>
                <a href="/produits" class="btn btn-ghost"
                    >Voir Tous <Icon name="material-symbols:arrow-right-alt"
                /></a>
            </div>
            <SectionProductList :product-list="produitSuggestions.slice(0, 4)" />
        </div>
    </div>
    <div
        class="w-full text-center h-96 grid place-items-center"
        v-else-if="isLoading"
    >
        <Icon
            name="mdi-loading"
            class="animate-spin text-5xl text-slate-500"
            size="60"
        />
    </div>
    <PageNotFound v-else />
</template>

<script lang="ts" setup>
import { produitsMedicaux } from "~/mock/produits.mock";
import { type Produits } from "~/types/produits.model";
import { getProductList, getProduitById } from "~/utils/api/produits.api";

const router = useRouter();
const route = useRoute();

const isLoading = ref(true);

const id = ref(route.params.id);

const currentProduit = ref<Produits>();

const produitSuggestions = ref<Produits[]>([]);

getProductList().then((res) => {
    produitSuggestions.value = res;
});

getProduitById(+id.value).then((res) => {
    currentProduit.value = res;
    isLoading.value = false;
});
</script>

<style></style>
