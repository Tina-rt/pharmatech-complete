export const getProductList = async (filter?: {
    price?: "asc" | "desc";
    category?: number;
}) => {
    let queryUrl = "produit?";
    if (filter?.price) {
        queryUrl += `price=${filter?.price}`;
    }
    if (filter?.category !== undefined) {
        queryUrl += `&cat=${filter?.category}`;
    }
    try {
        const { data } = await $api(queryUrl, {
            method: "GET",
        });
        return data;
    } catch (e) {
        return [];
    }
};

export const getProduitById = async (id: number) => {
    try {
        const { data } = await $api(`produit/${id}`, {
            method: "GET",
        });
        return data;
    } catch (e) {
        return null;
    }
};

export const getTopProduits = async () => {
    try {
        const { data } = await $api("produit/top", {
            method: "GET",
        });
        return data;
    } catch (e) {
        return [];
    }
};

export const getProduitByCategorie = async (id: number) => {
    try {
        const { data } = await $api(`produit/categorie/${id}`, {
            method: "GET",
        });
        return data;
    } catch (e) {
        return [];
    }
};
