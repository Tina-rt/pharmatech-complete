<template>
    <div class="p-4 flex flex-col gap-5">
        <NuxtLink to="/order" class="btn btn-ghost w-fit"
            ><Icon size="30" name="mdi-arrow-left-thin" /> Retour </NuxtLink
        >
        <template v-if="!isLoading && !isError">
            <div class="flex gap-3 items-center">
                <h1 class="text-3xl">Id du commande : {{ currentOrderId }}</h1>
                <div class="status badge badge-accent">
                    {{ currentUserOrder?.statut }}
                </div>
                <!-- <div class="status badge badge-success">Credit card</div> -->
            </div>
            <div class="date-section">{{ new Date().toLocaleString() }}</div>
            <div class="shipping-details p-2 flex flex-col gap-4">
                <h3 class="text-xl bg-base-100 p-2">Details du livraison</h3>
                <div class="grid grid-cols-2 w-fit gap-2 gap-x-10" v-if="currentUserOrder?.livraison">
                    <div>Date de livraison</div>
                    <div>
                        {{
                            moment(
                                currentUserOrder?.livraison.date_livraison,
                            ).format('DD/MM/YYYY HH:MM')
                        }}
                    </div>
                    <div>Destinataire</div>
                    <div>
                        {{ currentUserOrder?.livraison.nom }}
                        {{ currentUserOrder?.livraison.prenom }}
                    </div>
                    <div>Adresse</div>
                    <div>{{ currentUserOrder?.livraison.adresse }}</div>
                    <div>Ville</div>
                    <div>{{ currentUserOrder?.livraison.ville }}</div>
                    <div>Numero de téléphone</div>
                    <div>{{ currentUserOrder?.livraison.phone }}</div>
                    <div>E-mail</div>
                    <div>{{ currentUserOrder?.livraison.email }}</div>
                    <div>Méthode de paiement</div>
                    <div>{{ currPaiement?.nom ?? 'Inconnus' }}</div>
                </div>
                <div v-else class="w-full text-center italic">
                    Aucune information
                </div>
            </div>
            <div
                class="border rounded-lg border-gray-500 p-3 flex flex-col gap-4"
            >
                <h2 class="text-2xl">Listes des produits commandés</h2>
                <div
                    class="flex gap-4"
                    v-for="order in currentUserOrder?.produits"
                >
                    <div class="img-section">
                        <img
                            :src="$renderImage(order.image)"
                            alt="product image"
                        />
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <div class="desc flex flex-col h-full">
                            <div class="name font-bold">
                                {{ order.nomProduit }}
                            </div>
                            <div class="brand"></div>
                            <div class="price">Ar {{ order.prixUnitaire }}</div>
                            <div class="qty">
                                Qty: {{ order.quantiteCommandee }}
                            </div>
                        </div>
                        <div class="flex gap-3 h-fit">
                            <div class="border border-gray-600 p-2 rounded-lg">
                                {{ order.quantiteCommandee }} x Ar
                                {{ order.prixUnitaire }}
                            </div>
                            <div class="border border-gray-600 p-2 rounded-lg">
                                Ar {{ order.prixAvecTva }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-2 justify-between">
                <div class="flex gap-2">
                    <div
                        class="btn btn-primary"
                        :class="{
                            'btn-disabled':
                                changeOrderStatusIsLoading ||
                                currentUserOrder?.statut !== 'en cours',
                        }"
                        @click="() => changeStatus('expediee')"
                    >
                        <Icon
                            v-if="changeOrderStatusIsLoading"
                            name="mdi-loading"
                            class="animate-spin"
                        />
                        Expedier cette commande
                    </div>
                    <div
                        class="btn btn-success"
                        :class="{ 'btn-disabled': changeOrderStatusIsLoading || currentUserOrder?.statut === 'livree' }"
                        @click="() => changeStatus('livree')"
                    >
                        <Icon
                            v-if="changeOrderStatusIsLoading"
                            name="mdi-loading"
                            class="animate-spin"
                            
                        />
                        Marquer comme livrée
                    </div>
                </div>
                <div
                    class="btn btn-error"
                    :class="{
                        'btn-disabled': currentUserOrder?.statut !== 'en cours',
                    }"
                >
                    <Icon name="mdi-delete" />
                    Annuler la commande
                </div>
            </div>
        </template>
        <div class="w-full flex justify-center" v-else>
            <Icon name="mdi-loading" class="animate-spin" size="30" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
import { useMyOrderStoreStore } from '~/store/orderStore';
import type { OrderItem, UserOrder } from '~/types/orderItem.models';
import type { Paiement } from '~/types/paiement.model';

const currentOrderId = ref<string>('');
const route = useRoute();

const isLoading = ref(true);
const isError = ref(false);

const orderItems = ref<OrderItem[]>([]);

const changeOrderStatusIsLoading = ref(false);
const currentUserOrder = ref<UserOrder>();
const currPaiement = ref<Paiement>();

const changeStatus = (statut: string) => {
    changeOrderStatusIsLoading.value = true;
    updateOrderStatus(+currentOrderId.value, statut)
        .then((data) => {
            updateOrder();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            changeOrderStatusIsLoading.value = false;
        });
};

const updateOrder = () => {
    getOrderById(+currentOrderId.value)
        .then((data) => {
            currentUserOrder.value = data;

            getPaiementByOrderId(+currentOrderId.value).then((data)=>{
                currPaiement.value = data;
            })
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
            isError.value = true;
        })
        .finally(() => {
            isLoading.value = false;
        });
};



onMounted(() => {
    currentOrderId.value = route.params.id as string;
    updateOrder();
    // currentUserOrder.value = useMyOrderStoreStore().currentOrderToEdit;
});
</script>

<style lang="scss" scoped>
.img-section {
    max-width: 10rem;
}
</style>
