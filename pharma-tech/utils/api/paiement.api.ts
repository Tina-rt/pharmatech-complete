import type { Paiement } from "~/types/paiement.model";

export const addPaiement = async (paiement: Paiement) => {
    const { data } = await $api("paiement", {
        method: "POST",
        body: paiement,
    });
    return data;
};