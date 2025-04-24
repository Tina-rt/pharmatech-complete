export const getPaymentMethods = async () => {
    try{

        const { data } = await $api("methodePaiement", {
            method: "GET",
        });
        return data;
    }catch(e) {
        console.log(e);
        return [];
    }
};