import type { OrderItem, ProduitOrder } from "~/types/orderItem.models";

export const createOrderDb = async () => {
    const { data, status } = await $api("commande", {
        method: "POST",
    });
    if (status != "success") {
        return false;
    }
    return data;
};

export const getOrderDb = async (): Promise<OrderItem[] | boolean> => {
    try {
        const { data, status } = await $api("commande");

        if (status != "success") {
            return false;
        }
        const finalData: OrderItem[] = data.map((item: any) => {
            return {
                id: item.idCommande,
                date: item.date,
                statusMessage: item.statut,
                orders: item.commande,
                total: item.commande.reduce(
                    (acc: number, curr: any) => acc + curr.prixAvecTVA,
                    0
                ),
            };
        });
        return finalData;
    } catch (e) {
        return [];
    }
};

export const getOrderByIdDb = async (id: number): Promise<any> => {
    const { data, status, sousTotal, total } = await $api(`commande/${id}`);
    if (status != "success") {
        return false;
    }

    return { data, sousTotal, total };
};

export const getLivraisonByOrderIdDb = async (orderId: number) => {
    const { data, status } = await $api(`livraison/${orderId}`);
    if (status != "success" || !data) {
        return false;
    }
    return data[0];
};
