import type { CartItem } from './cartItem.models';
import type { Produits } from './produits.model';

export interface UserOrder {
    idUtilisateur: number;
    nomUtilisateur: string;
    prenomUtilisateur: string;
    emailUtilisateur: string;
    idCommande: number;
    dateCommande: Date;
    statut: string;
    total: number;
    produits: OrderItem[];
    livraison: Livraison;
}

export interface Livraison {
    nom: string;
    prenom: string;
    email: string;
    phone: string;
    adresse: string;
    ville: string;
    code_postal: string;
    date_livraison: Date;
    prescription?: string;
}

export interface OrderItem {
    idProduit: number;
    nomProduit: string;
    quantiteCommandee: number;
    prixUnitaire: number;
    tva: number;
    prixAvecTva: number;
    image: string;
}
