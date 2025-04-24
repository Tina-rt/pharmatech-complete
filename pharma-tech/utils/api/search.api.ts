export const searchProduit = async (searchKw: string, cat?: number) => {
    if (searchKw.length === 0 && cat === undefined) return [];
    const { data } = await $api(`produit/recherche?nom=${searchKw}&cat=${cat ?? ''}`, {
        method: "GET",
    });
    return data;
};
