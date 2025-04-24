<template>
    <div class="p-4 md:px-5 lg:px-5 xl:px-5">
        <h1 class="subtitle">Mon Panier</h1>
        <CartList />
        <div
			v-if="cartStore.cartStore.length > 0"
            class="actions flex w-full justify-center gap-4 mt-8 py-2 flex-wrap"
        >
            <button class="btn btn-secondary" @click="emptyCart">Vider le panier</button>
            <NuxtLink to="/payout" class="btn btn-primary">Continuer votre commande</NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>

const cartStore = useMyCartStoreStore();

const emptyCart = () => {
    cartStore.emptyCart();
};

</script>

<style lang="scss" scoped>
.actions {
    .btn {
        min-width: 240px;
        @media screen and (max-width: 768px) {
            min-width: 100%;
        }
    }
}
</style>
