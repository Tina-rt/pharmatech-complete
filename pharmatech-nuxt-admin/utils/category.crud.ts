import { $api } from '~/composables/api';
import type { Category } from '~/types/category.model';

const apiBaseUrl = useRuntimeConfig().public.apiBase;
export const getCategoryList = async (): Promise<Category[]> => {
    // const { data } = await axios.get(`${apiBaseUrl}/produit`. {headers: 'Authroizatio'});
    const { data } = await $api(`categorie`);
    return data;
};

export const addCategory = async (catName: string) => {
    try {
        const { data } = await $api('categorie', {
            method: 'POST',
            body: {
                nom: catName,
            },
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};
