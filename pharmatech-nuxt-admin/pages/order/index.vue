<template>
    <div class="p-4">
        <h1 class="text-3xl">Commandes</h1>
        <div class="py-4 flex justify-end w-full">
            <div class="btn btn-accent" @click="exportOrder">
                <Icon name="mdi-export" /> Export
            </div>
        </div>
        <div class="pt-5 flex flex-col gap-3">
            <!-- <template v-if="orderList.size === 0"> -->
            <Tabs value="0">
                <TabList class="flex flex-wrap">
                    <Tab value="0">Toutes les commandes</Tab>
                    <Tab value="1">Commandes en cours</Tab>
                    <Tab value="2">Commandes expédiées</Tab>
                    <Tab value="3"> Commandes livrées</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <div class="flex flex-col gap-3">
                            <h1 class="text-xl bg-base-100 p-2">
                                Toutes les commandes
                            </h1>
                            <DataTable
                                :value="orderList"
                                :loading="isLoading"
                                @row-click="handleRowClick"
                                row-hover
                                scrollHeight="500px"
                            >
                                <Column
                                    header="Order id"
                                    field="idCommande"
                                ></Column>
                                <Column
                                    header="Customer Name"
                                    field="nomUtilisateur"
                                ></Column>
                                <Column
                                    header="Order Date"
                                    field="dateCommande"
                                >
                                    <template #body="{ data }">
                                        {{
                                            moment(data.dateCommande).format(
                                                'DD/MM/YYYY',
                                            )
                                        }}
                                    </template>
                                </Column>
                                <Column
                                    header="Order Status"
                                    field="statut"
                                ></Column>
                                <Column header="Total (MGA)">
                                    <template #body="{ data }">
                                        {{ $formatCurrency(data.total, true) }}
                                    </template>
                                </Column>
                                <Column header="Actions">
                                    <template #body="{ data }">
                                        <NuxtLink :to="`order/${data.orderId}`">
                                            <button class="btn btn-ghost">
                                                <Icon name="mdi-eye" />
                                            </button>
                                        </NuxtLink>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="flex flex-col gap-3">
                            <h1 class="text-xl bg-base-100 p-2">
                                Commande en cours
                            </h1>
                            <DataTable
                                :value="loadingOrder"
                                :loading="isLoading"
                                @row-click="handleRowClick"
                                row-hover
                                scrollHeight="500px"
                            >
                                <Column
                                    header="Order id"
                                    field="idCommande"
                                ></Column>
                                <Column
                                    header="Customer Name"
                                    field="nomUtilisateur"
                                ></Column>
                                <Column
                                    header="Order Date"
                                    field="dateCommande"
                                >
                                    <template #body="{ data }">
                                        {{
                                            moment(data.dateCommande).format(
                                                'DD/MM/YYYY',
                                            )
                                        }}
                                    </template>
                                </Column>
                                <Column
                                    header="Order Status"
                                    field="statut"
                                ></Column>
                                <Column header="Total (MGA)">
                                    <template #body="{ data }">
                                        {{ $formatCurrency(data.total, true) }}
                                    </template>
                                </Column>
                                <Column header="Actions">
                                    <template #body="{ data }">
                                        <NuxtLink :to="`order/${data.orderId}`">
                                            <button class="btn btn-ghost">
                                                <Icon name="mdi-eye" />
                                            </button>
                                        </NuxtLink>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div class="flex flex-col gap-3">
                            <h1 class="text-xl bg-base-100 p-2">
                                Commandes expediées
                            </h1>
                            <DataTable
                                :value="inExpeditionOrder"
                                :loading="isLoading"
                                @row-click="handleRowClick"
                                row-hover
                                scrollHeight="500px"
                            >
                                <Column
                                    header="Order id"
                                    field="idCommande"
                                ></Column>
                                <Column
                                    header="Customer Name"
                                    field="nomUtilisateur"
                                ></Column>
                                <Column
                                    header="Order Date"
                                    field="dateCommande"
                                >
                                    <template #body="{ data }">
                                        {{
                                            moment(data.dateCommande).format(
                                                'DD/MM/YYYY',
                                            )
                                        }}
                                    </template>
                                </Column>
                                <Column
                                    header="Order Status"
                                    field="statut"
                                ></Column>
                                <Column header="Total (MGA)">
                                    <template #body="{ data }">
                                        {{ $formatCurrency(data.total, true) }}
                                    </template>
                                </Column>
                                <Column header="Actions">
                                    <template #body="{ data }">
                                        <NuxtLink :to="`order/${data.orderId}`">
                                            <button class="btn btn-ghost">
                                                <Icon name="mdi-eye" />
                                            </button>
                                        </NuxtLink>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <div class="flex flex-col gap-3">
                            <h1 class="text-xl bg-base-100 p-2">
                                Commandes livrées
                            </h1>
                            <DataTable
                                :value="shippedOrder"
                                :loading="isLoading"
                                @row-click="handleRowClick"
                                row-hover
                                scrollHeight="500px"
                            >
                                <Column
                                    header="Order id"
                                    field="idCommande"
                                ></Column>
                                <Column
                                    header="Customer Name"
                                    field="nomUtilisateur"
                                ></Column>
                                <Column
                                    header="Order Date"
                                    field="dateCommande"
                                >
                                    <template #body="{ data }">
                                        {{
                                            moment(data.dateCommande).format(
                                                'DD/MM/YYYY',
                                            )
                                        }}
                                    </template>
                                </Column>
                                <Column
                                    header="Order Status"
                                    field="statut"
                                ></Column>
                                <Column header="Total (MGA)">
                                    <template #body="{ data }">
                                        {{ $formatCurrency(data.total, true) }}
                                    </template>
                                </Column>
                                <Column header="Actions">
                                    <template #body="{ data }">
                                        <NuxtLink :to="`order/${data.orderId}`">
                                            <button class="btn btn-ghost">
                                                <Icon name="mdi-eye" />
                                            </button>
                                        </NuxtLink>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <!-- </template> -->
            <!-- <table class="table ">
                <thead>
                    <tr class="table-pin-rows">
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-base-100 cursor-pointer" v-for="order in orderList" :key="order.orderId" @dblclick="()=>{
                        $router.push(`order/${order.orderId}`)
                    }">
                        <td>{{ order.orderId }}</td>
                        <td>{{ order.customerName }}</td>
                        <td>{{ order.orderDate }}</td>
                        <td>{{ order.orderStatus }}</td>
                        <td>{{ order.total }}</td>
                        <td class="flex gap-3">
                            <NuxtLink
                                :to="`order/${order.orderId}`"
                            >
                                <button class="btn btn-ghost"><Icon name="mdi-eye"/> </button>
                            </NuxtLink>
                            <NuxtLink
                                :to="{
                                    // name: 'orderDetail',
                                    // params: { id: order.orderId },
                                }"
                            >
                                <button class="btn btn-ghost"><Icon name="mdi-pencil"/> </button>
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table> -->
        </div>
        <!-- <div v-else class="w-full flex justify-center p-3">
            <Icon name="mdi-loading" class="animate-spin" size="50" />
        </div> -->
        <Toast />

    </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
import { useMyOrderStoreStore } from '~/store/orderStore';
import type { UserOrder } from '~/types/orderItem.models';

const router = useRouter();
const toast = useToast();
const orderStore = useMyOrderStoreStore();
const orderList = ref<UserOrder[]>([]);

const loadingOrder = ref<UserOrder[]>([]);
const inExpeditionOrder = ref<UserOrder[]>([]);
const shippedOrder = ref<UserOrder[]>([]);

const isLoading = ref(true);

const handleRowClick = (data: any) => {
    const current = data.data;
    orderStore.currentOrderToEdit = data.data;
    router.push(`order/${current.idCommande}`);
};

onMounted(() => {
    getAllOrders()
        .then((data: Array<any>) => {
            orderList.value = data;

            inExpeditionOrder.value = data.filter(
                (order) => order.statut.toLowerCase() === 'expediee',
            );
            loadingOrder.value = data.filter(
                (order) => order.statut.toLowerCase() === 'en cours',
            );
            shippedOrder.value = data.filter(
                (order) => order.statut.toLowerCase() === 'livree',
            );
        })
        .catch((e) => {
            console.log(e);
            orderList.value = [];
        })
        .finally(() => {
            isLoading.value = false;
        });
});

const exportOrder = () => {
    const now = new Date();
    $downloadFile('commande/export', `commande du ${now.getDay()}-${now.getMonth()}-${now.getFullYear()}.csv`);
    toast.add({
        summary: 'Export effectué avec succès',
        severity: 'success',
        life: 2000,
    })
};
</script>

<style></style>
