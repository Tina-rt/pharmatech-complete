export const getCartList = async () => {
    const { data } = await $api("panier", {
        method: "GET",
    });
    return data;
};

export const addProductToCartDb = async (id: number, quantity: number) => {
    const { data } = await $api("panier/" + id, {
        method: "POST",
        body: {
            quantite: quantity,
        },
    });
    return data;
};

export const removeProductFromCartDb = async (id: number) => {
    const { data } = await $api("panier/" + id, {
        method: "DELETE",
    });
    return data;
};

export const updateCartItemDb = async (id: number, quantity: number) => {
    console.log("Update cart item db ...");
    const { data } = await $api("panier/" + id, {
        method: "PATCH",
        body: {
            quantite: quantity,
        },
    });
    return data;
};

export const validateCartDb = async () => {
    const { data } = await $api("panier/valider", {
        method: "POST",
    });
    return data;
};

export const emptyCartDb = async () => {
    const { data } = await $api("panier/vider", { method: "DELETE" });
    return data;
};
