<template>
    <div class="p-4">
        <h1>{{ resultLabel }}</h1>
        <div class="flex flex-wrap gap-3 py-6" v-if="result.length > 0">
            <MiniProduit
                aspect="1"
                :produits="produit"
                v-for="produit in result"
            />
        </div>
        <div v-else>
            <div class="italic w-full text-center p-4">
                Aucun resultat trouvé. Essayer de changer les filtres
            </div>
        </div>
    </div>
    <div v-if="queryKw.length === 0 && !queryCat" class="p-4 text-center">
        Veuillez saisir un mot clé ou pour pouvoir acceder aux recherches
    </div>
</template>

<script lang="ts" setup>
import MiniArticle from "~/components/Card/MiniArticle.vue";
import MiniProduit from "~/components/Card/MiniProduit.vue";
import type { Produits } from "~/types/produits.model";
import { searchProduit } from "~/utils/api/search.api";

const route = useRoute();
const categoryStore = useMyCategorieStoreStore();

const result = ref<Produits[]>([]);

const queryKw = ref("");
const queryCat = ref();

const resultLabel = computed(() => {
    queryCat.value = route.query.cat;

    if (queryKw.value === "" && queryCat.value !== undefined) {
        return `Résultat de recherche "${
            categoryStore.getCatById(+queryCat.value)?.nom
        }"`;
    }else if (queryKw.value.length > 0 || queryCat.value){

        return `Résultat de recherche pour "${queryKw.value}"`;
    }else{
        return "Résultat de recherche";
    }
});

console.log(queryKw.value);

const handleSearch = () => {
    queryKw.value = (route.query.q as string) ?? "";
    queryCat.value = route.query.cat;

    searchProduit(queryKw.value, queryCat.value)
        .then((data) => {
            // console.log(data);
            result.value = data;
            console.log(result.value);
        })
        .catch((e) => {
            console.log(e);
            result.value = [];
        });
};

watch(
    () => route.fullPath,
    () => {
        handleSearch();
    },
    { immediate: true }
);
</script>

<style lang="scss" scoped></style>
