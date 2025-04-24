<template>
    <div
        class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 grid-rows-1 gap-5 px-2 lg:px-5 md:px-5 xl:px-5 max-h-[100dvh] md:max-h-[400px] lg:max-h-[400px] xl:max-h-[400px]"
    >
        <div class="img-container">
            <img :src="$renderImage(props.produit.image)" alt="" />
        </div>
        <div class="flex flex-col gap-5">
            <div class="description flex flex-col gap-4 justify-center">
                <div class="py-4">
                    <div class="product-name bold-title">
                        {{ props.produit.nom }}
                    </div>
                    <div class="in-stock">En stock</div>
                    <div class="price bold-title">
                        {{ $formatCurrency(props.produit.prix) }}
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-5 items-center">
                    <label for="" class="bold-title">Catégorie</label>
                    <div class="cat-val">{{ props.produit.categorie.nom }}</div>
                    <label for="" class="bold-title">Ordonnance</label>
                    <div class="ord-val">Pas obligatoire</div>
                    <label for="quantity" class="bold-title">Quantité</label>
                    <InputNumber v-model="quantite" />
                </div>
            </div>
            <div class="flex w-full">
                <button class="btn btn-primary w-fit" @click="handleAddToCart">
                    Ajouter au panier
                    <Icon name="mdi:cart-plus" size="20" />
                </button>
            </div>
        </div>
        <Toast ref="toast" />

    </div>
</template>

<script lang="ts" setup>
import type { Produits } from "~/types/produits.model";

const props = defineProps<{
    produit: Produits;
}>();

const quantite = ref(1)

const cartStore = useMyCartStoreStore();
const authStore = useMyAuthStoreStore();
const toast = ref();

const handleAddToCart = () => {
    if (!authStore.token) {
        window.location.hash = "auth";
        return;
    }
    cartStore.addProductToCart({
        produits: props.produit,
        quantity: quantite.value,
    });
    toast.value.show(
        "Produit ajouté au panier",
        `${props.produit.nom} a été ajouté au panier`,
        "mdi:check-circle",
        "success"
    );
};
</script>

<style scoped lang="scss">
.img-container {
    width: 100%;
    height: 100%;

    img {
        height: 100%;
        object-fit: contain;
    }
}

.product-name {
    font-size: 2rem;
}
.in-stock {
    color: var(--vert-principal);
}
.ord-val {
    color: var(--vert-fonce-1);
    background: #cfff85;
    min-width: fit-content;
    width: 200px;
    text-align: center;
    font-weight: 700;
    padding: 0.5rem 1rem;
}
</style>
