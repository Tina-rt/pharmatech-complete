<template>
    <div class="flex flex-col gap-4 p-4">
        <h1 class="text-2xl">Produits</h1>
        <div class="card bg-base-200 p-4 flex flex-col gap-4">
            <div class="w-full flex justify-between gap-4">
                <div class="btn btn-accent" @click="exportProduit">
                    <Icon name="mdi-export" /> Export
                </div>
                <NuxtLink to="/products/add" class="btn btn-primary"
                    >Ajouter un nouveau produits</NuxtLink
                >
            </div>
            <DataTable
                :value="productList"
                v-model:selection="selectedProduct"
                v-model:filters="filters"
                :globalFilterFields="['nom', 'description']"
                sortMode="multiple"
                :loading="dataIsLoading"
                scrollHeight="500px"
                @row-dblclick="handleRowClick"
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
                <Column
                    selectionMode="multiple"
                    headerStyle="width: 3rem"
                ></Column>
                <Column
                    field="id"
                    header="Id"
                    sortable
                    filter-field="id"
                ></Column>
                <Column
                    field="numero_serie"
                    header="Numero de serie"
                    sortable
                ></Column>
                <Column field="image" header="Image">
                    <template #body="{ data }">
                        <img
                            :src="$renderImage(data.image)"
                            alt=""
                            class="max-w-28 h-24 max-h-24 object-cover"
                        />
                    </template>
                </Column>
                <Column
                    field="nom"
                    filter-field="nom"
                    header="Nom"
                    sortable
                ></Column>
                <Column field="categorie.nom" header="Categorie" sortable>
                </Column>
                <Column field="description" header="Description">
                    <template #body="{ data }">
                        {{ data.description?.substring(0, 40) }}
                        {{
                            data.description && data.description?.length > 40
                                ? '...'
                                : ''
                        }}
                    </template>
                </Column>
                <Column field="prix" header="Prix" sortable>
                    <template #body="{ data }">
                        <div>
                            {{ $formatCurrency(data.prix, true) }}
                        </div>
                    </template>
                </Column>
                <Column>
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <div
                                class="btn btn-ghost"
                                @click="handleEdit(+data.id)"
                            >
                                <Icon name="mdi-pencil" />
                            </div>
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

            <Toast />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Produits } from '~/types/produits.model';
import { FilterMatchMode } from '@primevue/core/api';

const productList = ref<Produits[]>([]);

const selectedProduct = ref<Produits[]>([]);
const dataIsLoading = ref(true);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nom: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const toast = useToast();
const router = useRouter();

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

const refreshProductList = () => {
    getProduitsList()
        .then((data) => {
            productList.value = [...data];
            console.log(productList.value);
        })
        .catch((e) => {
            toast.add({
                summary: "Une erreur s'est produite",
                severity: 'error',
            });
        })
        .finally(() => {
            dataIsLoading.value = false;
        });
};

const handleDelete = (pId: number) => {
    deleteProduits(pId).then((res) => {
        if (res) {
            toast.add({
                summary: 'Product deleted succesfully !',
                severity: 'info',
            });
            refreshProductList();
        }
    });
};

const handleRowClick = (data: any) => {
    const { data: currPr } = data;
    router.push(`/products/${currPr.id}`);
};

const handleEdit = (prId: number) => {
    router.push(`/products/${prId}`);
};

const exportProduit = () => {
    $downloadFile('produit/export', 'Export Produits.csv');
    toast.add({
        summary: 'Export effectué avec succès',
        severity: 'success',
        life: 2000,
    });
};

refreshProductList();
</script>

<style></style>
