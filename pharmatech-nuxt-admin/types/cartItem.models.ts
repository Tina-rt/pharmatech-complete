import type { Produits } from "./produits.model";

export interface CartItem {
    produits: Produits;
    quantity: number;
}