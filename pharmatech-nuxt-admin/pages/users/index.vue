<template>
    <div class="p-4">
        <h1 class="text-3xl">Personnel</h1>
        <div class="pt-5">
            <div class="flex w-full justify-end p-4">
                <label
                    for="modalAddUser"
                    class="btn btn-primary"
                    onclick="modalAddUser.showModal()"
                >
                    <Icon name="mdi-plus" /> Ajouter un nouveau admin
                </label>
                <ModalUsers
                    :key="`modaluser${refreshModal}`"
                    ref="modalUser"
                    @save="initAdminList"
                    :userToEdit="userToEdit"
                    @close="handleCloseModal"
                />
            </div>
            <DataTable
                :value="clientList"
                v-model:filters="filters"
                :globalFilterFields="['nom', 'email', 'phone']"
                scrollHeight="500px"
                :loading="isLoading"
                @row-dblclick="handleRowDblClick"
            >
                <template #header>
                    <div class="flex justify-end">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText
                                v-model="filters['global'].value"
                                placeholder="Rechercher"
                            />
                        </IconField>
                    </div>
                </template>
                <Column field="id" header="Id">
                    <template #body="{ data }">
                        <div class="flex gap-2 items-center">
                            <span>{{ data.id }}</span>
                            <span
                                class="badge badge-info"
                                v-if="authStore.profile.id == data.id"
                                >Moi</span
                            >
                        </div>
                    </template>
                </Column>
                <Column field="nom" header="Nom"></Column>
                <Column field="prenom" header="Prenom"></Column>
                <Column field="phone" header="Telephone"></Column>
                <Column field="email" header="Email"></Column>
                <Column>
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <div
                                class="btn btn-ghost"
                                :class="{
                                    'btn-disabled':
                                        data.id == authStore.profile.id,
                                }"
                                @click="confirmDelete(+data.id)"
                            >
                                <Icon name="mdi-delete" />
                            </div>
                            <div
                                class="btn btn-ghost"
                                @click="handleRowDblClick({ data: data })"
                            >
                            <Icon name="mdi-pencil" />
                        </div>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
        <Toast />
        <ConfirmDialog />
    </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types/user.models';
import { FilterMatchMode } from '@primevue/core/api';
import { useMyAuthStore } from '~/store/auth';

const clientList = ref<User[]>([]);
const isLoading = ref(true);

const modalUser = ref();
const refreshModal = ref(0);
const modalIsOpen = ref(false);

const toast = useToast();
const confirm = useConfirm();
const authStore = useMyAuthStore();

const userToEdit = ref<User>();

const toastMessage = ref<{
    show: boolean;
    message: string;
    severity: string;
    icon: string;
}>({
    show: false,
    message: '',
    severity: 'info',
    icon: 'mdi-check',
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nom: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const handleCloseModal = () => {
    userToEdit.value = undefined;
    refreshModal.value++;
};

const initAdminList = () => {
    isLoading.value = true;
    getAllAdmin().then((data) => {
        clientList.value = data;
        isLoading.value = false;
    });
};

const confirmDelete = (id: number) => {
    confirm.require({
        message: 'Êtes-vous sûr de vouloir supprimer cet administrateur ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Non',
            icon: 'pi pi-times',
            className: 'p-button p-button-text',
        },
        acceptLabel: 'Oui',
        accept: () => {
            handleDelete(id);
        },
    });
};

const handleRowDblClick = (data: any) => {
    userToEdit.value = data.data;
    console.log(data);
    modalIsOpen.value = true;
    modalUser.value.openModal();
};

const handleDelete = (id: number) => {
    toast.add({
        severity: 'info',
        summary: 'Administrateur supprimé avec succès !',
        life: 3000,
    });
    deleteUser(id).then((res) => {
        console.log(res);
        if (res) {
            initAdminList();
        }
    });
};

initAdminList();
</script>

<style></style>
