<template>
    <div class="bill grid grid-rows-3 grid-cols-2 gap-3">
        <label for="">
            <div>Sous Total</div>
            <div>({{ props.productNumber ?? 0 }} Produits)</div>
        </label>
        <div class="value sous-total">
            {{ total ? $formatCurrency(total) : 0 }}
        </div>
        <label for="tva">TVA</label>
        <div class="value tva">{{ $formatCurrency(tva) ?? 0 }}</div>
        <label for="shipping">Frais de livraison</label>
        <div class="value shipping">{{ $formatCurrency(props.shipping) }}</div>
        <div class="flex w-full justify-between col-span-2 total-sec">
            <label for="total">Total</label>
            <div class="total">{{ $formatCurrency(props.total + props.shipping) }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    sousTotal: number;
    tva: number;
    shipping: number;
    total?: number;
    productNumber: number;
}>()


const cartStore = useMyCartStoreStore();


const shipping = computed(() => {
    return 1000;
});
</script>

<style lang="scss" scoped>
.bill {
    padding: 1rem;
    background-color: var(--vert-clair-3);
    height: fit-content;
    border-radius: 12px;
    .value {
        justify-self: end;
        font-weight: bold;
    }
    .total-sec {
        border-top: 1px solid var(--vert-fonce-1);
        padding: 1rem 0;
    }
}
.label {
    align-self: self-start;
}
</style>
