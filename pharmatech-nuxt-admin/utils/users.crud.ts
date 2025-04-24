import type { User } from '~/types/user.models';

export const getAllAdmin = async () => {
    const { data } = await $api('utilisateur/admin');
    return data;
};

export const addNewAdmin = async (newUser: User) => {
    const { data } = await $api('utilisateur/admin', {
        method: 'POST',
        body: {
            nom: newUser.nom,
            prenom: newUser.prenom,
            email: newUser.email,
            mot_de_passe: newUser.password,
            role: 'admin',
            phone: newUser.phone,
        },
    });
    return data;
};

export const modifyAdmin = async (newUser: User) => {
    const {data} = await $api('utilisateur/admin', {
        method: 'PATCH',
        body: {
            id: newUser.id,
            nom: newUser.nom,
            prenom: newUser.prenom,
            email: newUser.email,
            mot_de_passe: newUser.password,
            phone: newUser.phone,
        }
    });
    return data;
}

export const emailValid = async (email: string) => {
    const { data } = await $api('utilisateur/emailvalid', {
        method: 'POST',
        body: { email: email },
    });
    return data;
};

export const deleteUser = async (id: number) => {
    const { data } = await $api('utilisateur/' + id, {
        method: 'DELETE',
    });
    return data;
};

export const getUserById = async (id: number) => {
    const { data } = await $api('utilisateur/' + id);
    return data;
};
