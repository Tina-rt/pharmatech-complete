<template>
    <div class="collapse bg-base-200">
        <input type="checkbox" />
        <div
            class="collapse-title font-medium flex w-full justify-between items-center"
        >
            <div>
                <div class="text-xl">
                    Commande #{{ props.order.id }} du {{ moment(props.order.date).format("DD/MM/YYYY") }}
                </div>
                <div class="total italic">{{ $formatCurrency(props.order.total) }}</div>
            </div>
            <Status :status-message="props.order.statusMessage"/>
        </div>
        <div class="collapse-content overflow-x-auto">
            <table class="table table-xs lg:table-lg md:table-md xl:table-lg">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cartitem in props.order.orders">
                        <td>{{ cartitem.nomProduit }}</td>
                        <td>{{ cartitem.quantiteCommandee }}</td>
                        <td>{{ $formatCurrency(cartitem.prixUnitaire) }}</td>
                        <td>{{ $formatCurrency(cartitem.prixAvecTVA) }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="p-2 w-full flex justify-end">
                <a
                    :href="'/order/' + props.order.id"
                    class="link italic underline"
                    >Voir plus de détails</a
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { OrderItem } from "~/types/orderItem.models";
import moment from "moment";
const props = defineProps<{
    order: OrderItem;
}>();
</script>

<style></style>
