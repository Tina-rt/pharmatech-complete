<script setup lang="ts">
import type { MethodePaiement } from '~/types/methodePaiement.models';
import { getMethodePaiementList } from '~/utils/methodePaiement.crud';

const router = useRouter();
const methodePaiementList = ref<MethodePaiement[]>([]);

const isLoading = ref(true);
const toast = useToast();
const confirm = useConfirm();

const initList = () => {
    isLoading.value = true;
    getMethodePaiementList()
        .then((res) => {
            methodePaiementList.value = res;
        })
        .finally(() => {
            isLoading.value = false;
        });
};

const handleRowClick = (data_: any) => {
    const { data: currEl } = data_;
    router.push('/paiement/' + currEl.id);
};

const handleDelete = (id: number) => {
    confirm.require({
        message: 'Voulez vous vraiment supprimer ce methode de paiement ?',
        accept: () => {
            deleteMethodePaiement(id).then((res) => {
                if (res) {
                    toast.add({
                        summary: 'Methode de paiement supprimé avec succes',
                        life: 3000,
                        severity: 'info',
                    });
                    initList();
                }
            });
        },
        header: 'Confirmer la suppression',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        rejectProps: {
            label: 'Non',
            icon: 'pi pi-times',
            className: 'p-button p-button-text',
        },
    });
};

initList();
</script>

<template>
    <div class="p-4">
        <h1 class="text-2xl">Méthode de paiement</h1>
        <div class="w-full px-4 flex justify-end">
            <div class="btn btn-primary" @click="$router.push('/paiement/add')">
                <Icon name="mdi-plus" /> Ajouter
            </div>
        </div>
        <div class="p-4">
            <DataTable
                @row-dblclick="handleRowClick"
                :loading="isLoading"
                :value="methodePaiementList"
            >
                <Column field="nom" header="Designation"></Column>
                <Column field="description" header="Description"></Column>
                <Column>
                    <template #body="{ data }">
                        <div class="flex gap-1">
                            <div
                                class="btn btn-ghost"
                                @click="handleDelete(data.id!)"
                            >
                                <Icon name="mdi-delete" />
                            </div>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Toast />
    <ConfirmDialog />
</template>
