import { defineStore } from 'pinia';
import { type OrderItem, type UserOrder } from '~/types/orderItem.models';

export const useMyOrderStoreStore = defineStore({
    id: 'myOrderStoreStore',
    state: () => ({
        currentOrderToEdit: undefined as unknown as UserOrder,
    }),
    actions: {},
});
