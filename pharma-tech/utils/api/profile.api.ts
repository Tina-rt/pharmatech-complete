export const updateProfile = async (
    id?: number,
    nom?: string,
    prenom?: string,
    email?: string
) => {
    try{

        const { data } = await $api("utilisateur/profile", {
            method: "POST",
            body: {
                id,
                nom,
                prenom,
                email,
                role: "client",
            },
        });
        return data;
    } catch (e) {
        return false;
    }
};
