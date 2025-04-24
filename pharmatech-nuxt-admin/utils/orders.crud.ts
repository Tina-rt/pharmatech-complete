export const getAllOrders = async () => {
    const { data } = await $api('commande/liste');
    return data;
};

export const getOrderById = async (orderId: number) => {
    const { data } = await $api(`admin/commande/${orderId}`);
    return data;
};

export const updateOrderStatus = async (orderId: number, status: string) => {
    const { data } = await $api(`commande/${orderId}`, {
        method: 'patch',
        body: {
            statut: status,
        }
    });
    return data;    
};
