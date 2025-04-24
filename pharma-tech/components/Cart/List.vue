<template>
    <div class="lg:grid md:grid xl:grid main-cart">
        <div class="cart-list py-4 px-3 flex flex-col gap-4">
            <div
                class="w-full h-full flex flex-col justify-center items-center text-gray-400 text-center"
                v-if="cartStore.cartStore.length === 0"
            >
                <Icon name="mdi-cart-off" size="40" />
                <div class="italic">
                    Vous n'avez pas encore de produits dans le panier
                </div>
            </div>
            <template v-else>
                <CartItem
                    v-for="cartItem in cartStore.cartStore"
                    :cart-item="cartItem"
                >
                </CartItem>
            </template>
        </div>
        <CartBill
            :product-number="cartStore.cartStore.length"
            :tva="cartStore.tva"
            :shipping="cartStore.shipping"
            :sous-total="cartStore.total"
            :total="cartStore.total"
            class="sticky top-[148px]"
        />
    </div>
</template>

<script lang="ts" setup>
import type { CartItem } from "~/types/cartItem.models";

const cartStore = useMyCartStoreStore();
</script>

<style scoped lang="scss">
.main-cart {
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
}

.in-stock {
    font-size: 0.8rem;
}
</style>
