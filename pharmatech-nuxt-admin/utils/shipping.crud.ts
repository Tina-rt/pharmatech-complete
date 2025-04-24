import type { Shipping } from "~/types/shipping.models";

export const addShippingWay = async (shipping: Shipping) => {
    try{
        const {data} = await $api('methodeLivraison', {
            body: shipping
        });
        return data;
    }catch(e) {
        console.log(e);
        return null;
    }
}