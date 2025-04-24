import { defineStore } from "pinia";
import type { CartItem } from "~/types/cartItem.models";
import type { Produits } from "~/types/produits.model";
import {
    addProductToCartDb,
    emptyCartDb,
    removeProductFromCartDb,
    updateCartItemDb,
} from "~/utils/api/cart.api";

const { calculateTotal, calculateTva } = useCalculateCart();

export const useMyCartStoreStore = defineStore("myCartStoreStore",{
    state: () => {
        if (import.meta.client) {
            const cartStore = localStorage.getItem("cartStore");
            if (cartStore) {
                return {
                    cartStore: JSON.parse(cartStore) as CartItem[],
                    shipping: 1000,
                };
            }
        }
        return {
            cartStore: [] as CartItem[],
            shipping: 5000,
        };
    },

    actions: {
        initCartStore() {
            if (useMyAuthStoreStore().token) {
                $api("panier")
                    .then((res) => {
                        console.log(res);
                        const { data } = res;
                        console.log(data);
                        this.cartStore = data.map((item: any) => {
                            return {
                                produits: {
                                    id: item.id,
                                    nom: item.nom,
                                    prix: item.prix_total,
                                    image: item.image,
                                },
                                quantity: item.quantite,
                            };
                        });
                        console.log(this.cartStore);
                    })
                    .catch((e) => {
                        console.log(e);
                        this.cartStore = [];
                    });
            }
        },
        addProductToCart(cartItem: CartItem) {
            console.log("Ato");
            if (
                this.cartStore.some(
                    (val) => val.produits.id == cartItem.produits.id
                )
            ) {
                const index = this.cartStore.findIndex(
                    (val) => val.produits.id == cartItem.produits.id
                );
                this.cartStore[index].quantity += cartItem.quantity;
                updateCartItemDb(
                    cartItem.produits.id,
                    this.cartStore[index].quantity
                );
                return;
            }
            this.cartStore.push(cartItem);
            addProductToCartDb(cartItem.produits.id, cartItem.quantity);
            this.updateCartStore();
        },
        removeProductFromCart(cartItem: CartItem) {
            const index = this.cartStore.indexOf(cartItem);
            this.cartStore.splice(index, 1);
            this.updateCartStore();
            console.log(cartItem.produits);
            removeProductFromCartDb(cartItem.produits.id);
        },
        updateCartItem(cartItem: CartItem) {
            console.log("Update cart item ... >>>");
            const index = this.cartStore.findIndex(
                (val) => val.produits.id == cartItem.produits.id
            );
            if (index > -1) {
                console.log(cartItem);
                this.cartStore[index] = cartItem;
            }
            this.updateCartStore();
            updateCartItemDb(cartItem.produits.id, cartItem.quantity);
        },
        emptyCart(config = { syncDb: true }) {
            this.cartStore = [];
            this.updateCartStore();
            if (config.syncDb) {
                emptyCartDb();
            }
        },
        updateCartStore() {
            localStorage.setItem("cartStore", JSON.stringify(this.cartStore));
        },
        getTotal(){
            return calculateTotal(this.cartStore, this.shipping);
        }
    },
    getters: {
        total(state) {
            return calculateTotal(this.cartStore, this.shipping);
        },

        tva(state) {
            return calculateTva(calculateTotal(this.cartStore, this.shipping));
        },

        totalBillWithTva(state) {
            const total = calculateTotal(this.cartStore, this.shipping);
            return total + calculateTva(total);
        },
    },
});
