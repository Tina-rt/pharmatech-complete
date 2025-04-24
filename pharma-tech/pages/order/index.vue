<template>
  <div class="px-5 h-full flex-1">
      <h1 class="subtitle">Mes commandes</h1>
      <div class="order-table flex flex-col gap-4 py-5" v-if="orders.length > 0">
          <OrderItem v-for="order in orders" :order="order"/>
      </div>
      <div class="w-full text-center p-5" v-else>
        <span class="italic">Vous n'avez aucune commande actuellement. </span>
        <br>
        <NuxtLink to="/produits" class="btn btn-primary m-5 "> <Icon name="mdi-cart" /> Commander maintenant</NuxtLink>
      </div>
  </div>
</template>

<script lang="ts" setup>
// import { orders } from '~/mock/orders.mock';
import type { OrderItem } from '~/types/orderItem.models';
import { getOrderDb } from '~/utils/api/order.api';

const orders = ref<any[]>([]);

getOrderDb().then((data: any) => {
  orders.value = data;
});


</script>

<style></style>
