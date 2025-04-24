<template>
    <div class="description-product">
        <h1 class="subtitle">Descriptions</h1>
        <div>
            <p>
                {{ props.produit.description }}
            </p>
            <div class="py-5">
                <h3 class="bold-title">Caractéristiques Principales</h3>
                <p>
                {{ props.produit.caracteristique_principale ?? "Informations inconnus" }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Produits } from '~/types/produits.model';


const props = defineProps<{
    produit: Produits
}>();

console.log(props.produit)

</script>

<style scoped lang="scss">
p {
    font-weight: 400;
}
h3 {
    font-size: 1.5rem;
}
</style>
