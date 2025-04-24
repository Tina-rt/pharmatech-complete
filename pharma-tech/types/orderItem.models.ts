import type { CartItem } from "./cartItem.models";
import type { Produits } from "./produits.model";

export interface OrderItem {
    id: number;
    date: string;
    status?: number;
    statusMessage?: string;
    total: number;
    cartItems: CartItem[];
    orders?: Array<ProduitOrder>;
}

export interface ProduitOrder {
    idProduit: number;
    nomProduit: string;
    quantiteCommandee: number;
    prixAvecTVA: number;
    prixUnitaire: number;
    TVA: number;
    image?: string;
}
