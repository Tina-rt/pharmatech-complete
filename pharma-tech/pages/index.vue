<template>
    <Hero />
    <div class="md:m-2 lg:m-2 xl:m-2 pt-4">
        <div
            class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 list-card"
        >
            <CardLink
                :title="card.title"
                :icon="card.icon"
                :icon-link="card.iconLink"
                :color="card.color"
                v-for="card in linksCard"
            />
        </div>
        <div class="lg:px-8 md:px-8 xl:px-8 px-1 py-2 flex flex-col gap-10">
            <div class="new-products">
                <div class="title-products w-full flex justify-between">
                    <h2 class="text-2xl font-bold">Nouveaux Produits</h2>
                    <NuxtLink to="/produits" class="btn btn-ghost"
                        >Voir Tous
                        <Icon name="material-symbols:arrow-right-alt"
                    /></NuxtLink>
                </div>
                <SectionProductList :product-list="listProduits.slice(0, 4)" />
            </div>
            <div class="popular-products">
                <div class="title-products w-full flex justify-between">
                    <h2 class="text-2xl font-bold">Produits Populaires</h2>
                    <a href="/produits" class="btn btn-ghost"
                        >Voir Tous
                        <Icon name="material-symbols:arrow-right-alt"
                    /></a>
                </div>
                <SectionProductList :product-list="listProduits.length > 4 ? listProduits.slice(4, 8): listProduits.slice(0,4)" />
            </div>
            <div class="promo">
                <CardPromoProduits
                    :produits="produit"
                    class="promo-produits"
                    :is-big="index == 0"
                    v-for="(produit, index) in listProduits.slice(9, 12)"
                />
            </div>
            <div class="stats">
                <SectionStats />
            </div>
            <div class="aboutus">
                <SectionAboutUs />
            </div>
            <div class="article-blog">
                <SectionArticleBlog />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { produitsMedicaux } from "~/mock/produits.mock";
import type { Produits } from "~/types/produits.model";

import { getProductList } from "~/utils/api/produits.api";

const apiBase = useRuntimeConfig().public.apiBase;

useHead({
    title: "Pharmatech",
    meta: [
        {
            name: "description",
            content:
                "Chez Pharmatech, nous nous engageons à vous offrir une expérience d'achat en ligne de produits de santé simple, sûre et rapide. Notre mission est de rendre les produits de santé accessibles à tous, tout en garantissant des services de qualité et une satisfaction client optimale.",
        },
    ],
});

const linksCard = [
    {
        title: "Promo Offert",
        iconLink: "~/assets/img/pricetagicon.svg",
        link: "#",
        color: "--vert-clair-1",
    },
    {
        title: "Livraison à Domicile",
        icon: "solar:delivery-outline",
        link: "#",
        color: "--rose-clair",
    },
    {
        title: "Conseil Médical",
        icon: "healthicons:doctor-male",
        link: "#",
        color: "--vert-clair-2",
    },
    {
        title: "Appareil Médical",
        icon: "material-symbols:stethoscope",
        link: "#",
        color: "--violet-clair",
    },
];

const listProduits = ref<Produits[]>([]);

const promoProduits = produitsMedicaux.slice(5, 8);

try {
    listProduits.value = await getProductList();
} catch (e) {
    console.log("Error while fetching product list", e);
    listProduits.value = [];
}
</script>

<style lang="scss" scoped>
.list-card {
    padding: 2rem 3rem;

    @media screen and (max-width: 786px) {
        padding: 2rem;
    }
}

.promo {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-auto-rows: 300px;
    gap: 1rem;
    width: 100%;
    padding: 2rem 0;
    .promo-produits:nth-child(1) {
        grid-row: span 2;

        @media screen and (max-width: 786px) {
            grid-row: span 1;
        }
    }
    @media screen and (max-width: 786px) {
        display: flex;
        flex-direction: column;
        max-width: 100%;
        gap: 1rem;
        padding: 2rem 0;
    }
}
</style>
