export const validateShippingDb = async (shippingFormData: FormData) => {
    const { data } = await $api("livraison", {
        method: "POST",
        body: shippingFormData,
    })

    return data;
}