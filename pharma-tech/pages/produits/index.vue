<template>
    <div>
        <HeroProduct />
        <div class="flex w-full justify-center">
            <Filter
                @filter-change="handleFilterChange"
                @filter-reset="handleFilterReset"
            />
        </div>
        <div
            class="py-3 px-7 flex flex-col gap-10"
            v-if="filterdProduits.length === 0"
        >
            <div class="new-products">
                <div class="title-products w-full flex justify-between">
                    <h2 class="text-2xl font-bold">Nouveaux Produits</h2>
                </div>
                <SectionProductList :product-list="listProduits.slice(0, 4)" />
            </div>
            <div class="popular-product">
                <div class="title-products w-full flex justify-between">
                    <h2 class="text-2xl font-bold">Produits populaire</h2>
                </div>
                <SectionProductList :product-list="listTopProduits" />
            </div>
            <div class="Appareil medical">
                <div class="title-products w-full flex justify-between">
                    <h2 class="text-2xl font-bold">Tous les produits</h2>
                    <!-- <a href="#" class="btn btn-ghost"
                        >Voir Tous
                        <Icon name="material-symbols:arrow-right-alt"
                    /></a> -->
                </div>
                <SectionProductList
                    :product-list="listProduits"
                />
            </div>
        </div>
        <div class="py-3 px-7 flex flex-col gap-10" v-else>
            <h2 class="text-2xl font-bold">Liste des produits filtré</h2>
            <SectionProductList :product-list="filterdProduits" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Produits } from "~/types/produits.model";
import {
    getProductList,
    getProduitByCategorie,
    getTopProduits,
} from "~/utils/api/produits.api";
const listProduits = ref<Produits[]>([]);
const listTopProduits = ref<Produits[]>([]);

const filterdProduits = ref<Produits[]>([]);

listProduits.value = await getProductList();

listTopProduits.value = await getTopProduits();

const handleFilterChange = async (filter: any) => {
    console.log(filter);
    filterdProduits.value = await getProductList(filter);
    console.log(filterdProduits.value);
};

const handleFilterReset = () => {
    filterdProduits.value = [];
};
</script>
