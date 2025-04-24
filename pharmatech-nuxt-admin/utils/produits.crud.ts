import { $api } from '~/composables/api';
import type { Category } from '~/types/category.model';
import type { Produits } from '~/types/produits.model';

const apiBaseUrl = useRuntimeConfig().public.apiBase;
export const getProduitsList = async (): Promise<Produits[]> => {
    // const { data } = await axios.get(`${apiBaseUrl}/produit`. {headers: 'Authroizatio'});
    const { data } = await $api(`produit?created_at=desc`);
    return data;
};

export const addProduits = async (produit: Produits, imageFile: File) => {
    const formData = new FormData();
    formData.append('nom', produit.nom!);
    formData.append('description', produit.description!);
    formData.append('prix', produit.prix?.toString()!);
    formData.append('image', imageFile!);
    formData.append('categorie_id', produit.categorie?.id.toString()!);
    formData.append('marque', produit.marque!);
    formData.append('numero_serie', produit.numero_serie!);
    formData.append(
        'caracteristique_principale',
        produit.caracteristique_principale!,
    );
    formData.append('reduction', '0'), formData.append('tva_pourcentage', '0');
    try {
        const { data, status } = await $api('produit', {
            method: 'POST',
            body: formData,
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const editProduits = async (produit: Produits, imageFile?: File) => {
    const formData = new FormData();
    formData.append('nom', produit.nom!);
    formData.append('description', produit.description!);
    formData.append('prix', produit.prix?.toString()!);
    formData.append('image', imageFile!);
    formData.append('categorie_id', produit.categorie?.id.toString()!);
    formData.append('marque', produit.marque!);
    formData.append('numero_serie', produit.numero_serie!);
    formData.append(
        'caracteristique_principale',
        produit.caracteristique_principale!,
    );
    formData.append('reduction', '0'), formData.append('tva_pourcentage', '0');
    try {
        const { data, status } = await $api(`produit/${produit.id}`, {
            method: 'PATCH',
            body: formData,
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const deleteProduits = async (pId: number) => {
    try{
        const {data, status} = await $api(`produit/${pId}`, {
            method: 'DELETE'
        });
        return true;
    } catch(e){
        console.error(e);
        return false;
    }
}

export const getProduitById = async (pId: number): Promise<Produits> => {   
    const { data } = await $api(`produit/${pId}`);
    return data;
}