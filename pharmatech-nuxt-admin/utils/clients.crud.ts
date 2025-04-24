export const getAllClients = async () => {
    const { data } = await $api('utilisateur/client');
    return data;
};
