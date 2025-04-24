export const getPaiementByOrderId = async (orderid: number) => {
    const { data } = await $api('paiement/commande/' + orderid);
    return data;
};
