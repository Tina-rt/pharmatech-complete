import type { MethodePaiement } from '~/types/methodePaiement.models';

export const getMethodePaiementList = async (): Promise<MethodePaiement[]> => {
    try {
        const { data } = await $api('methodePaiement');
        return data;
    } catch (e) {
        return [];
    }
};

export const getMethodPaiementById = async (id: number) => {
    try {
        const { data } = await $api('methodePaiement/' + id);
        return data;
    } catch (e) {
        return false;
    }
};

export const addMethodePaiement = async (
    newMethodePaiement: MethodePaiement,
) => {
    try {
        const { data } = await $api('methodePaiement', {
            method: 'post',
            body: newMethodePaiement,
        });
        if (data) return true;
    } catch (e) {
        return false;
    }
};

export const updateMethodePaiement = async (toEdit: MethodePaiement) => {
    try {
        if (!toEdit.id) {
            return false;
        }
        const { data } = await $api('methodePaiement/' + toEdit.id, {
            method: 'patch',
            body: toEdit,
        });
        return true;
    } catch (e) {
        return false;
    }
};

export const deleteMethodePaiement = async (id: number) => {
    try {
        const { data } = await $api('methodePaiement/' + id, {
            method: 'delete',
        });
        return true;
    } catch (e) {
        return false;
    }
};
