export interface Paiement {
    id?: number;
    commande_id: number;
    montant: number;
    methode_paiement_id: number;
    statut_paiement: string;
    nom: string;
}