import type { Category } from "./category.model";

export interface Produits {
    id: number;
    nom: string;
    description: string;
    prix: number;
    image: string;
    stock: number;
    categorie: string | Category;
    marque: string;
    numero_serie: string;
    caracteristique_principale: string;
    reduction: number;
    tva_pourcentage: number;
    createdAt: Date;
    updatedAt: Date;
    categorieObj?: Category;
}

