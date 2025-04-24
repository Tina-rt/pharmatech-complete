<template>
    <div
        class="cart-item  lg:justify-between md:justify-between xl:justify-between items-center w-full gap-5 flex-wrap"
    >
        <div class="flex gap-5 justify-between items-center cart-item-desc">
            <div class="cart-item-image">
                <img :src="renderServerImg(props.cartItem.produits.image)" alt="product" />
            </div>
            <div class="cart-item-details w-full">
                <h2 class="product-name">{{ props.cartItem.produits.nom }}</h2>
                <p class="text-green in-stock">En Stock</p>
                <button @click="handleRemoveCart">Remove</button>
            </div>
        </div>
        <div class="quantity h-full flex items-center">
            <InputNumber @change="handleAddQuantity" class="" v-model="quantity" />
        </div>
        <div
            class="total font-bold min-w-40 lg:min-w-fit xl:min-w-fit md:min-w-fit"
        >
            {{ $formatCurrency(totalPrice) }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CartItem } from "~/types/cartItem.models";

const props = defineProps<{
    cartItem: CartItem;
}>();

const cartStore = useMyCartStoreStore();

const { renderServerImg } = useRenderStatic();

const quantity = ref(1);
const totalPrice = computed(()=>{
   return props.cartItem.produits.prix * quantity.value
})


const handleRemoveCart = () => {
    cartStore.removeProductFromCart(props.cartItem);
}

const handleAddQuantity = () => {
    cartStore.updateCartItem({
        ...props.cartItem,
        quantity: quantity.value,
    });
}


watch(
    () => props.cartItem,
    (newCartItem) => {
        quantity.value = newCartItem.quantity;
        // totalPrice.value = newCartItem.produits.prix * quantity.value
    }, {
        immediate: true
    }
);

// watch(
//     () => quantity.value,
//     (newQuantity) => {
//         cartStore.updateCartItem({
//             ...props.cartItem,
//             quantity: newQuantity,
//         });
//     }
// );
onMounted(()=>{
    quantity.value = props.cartItem.quantity;
})
</script>

<style lang="scss" scoped>
.cart-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.451);
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }

}
.cart-item-desc{
    @media (max-width: 768px) {
        grid-column: span 2;
    }
}
.total {
    font-size: 1.2rem;
    justify-self: end;
}

.cart-item-image{
    max-width: 150px;
    max-height: 150px;
    aspect-ratio: 1/1;

    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>
