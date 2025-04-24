<template>
    <div class="p-3">
        <div
            class="bg-base-200 rounded-xl shadow-xl w-full h-full pt-5 pb-2 flex flex-col justify-between"
        >
            <ul class="menu">
                <li>
                    <NuxtLink class="px-5" to="/">
                        <Icon name="mdi-monitor-dashboard" />Tableau de
                        bord</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink class="px-5" to="/products">
                        <Icon name="mdi:package-variant-closed" />
                        Produits</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink class="px-5" to="/order">
                        <Icon name="mdi-invoice-multiple" /> Commandes</NuxtLink
                    >
                </li>
                <!-- <li>
                    <NuxtLink class="px-5" to="/shippingway"
                        ><Icon name="mdi-truck-delivery" />
                        Méthode de livraison</NuxtLink
                    >
                </li> -->
                <li>
                    <NuxtLink class="px-5" to="/paiement"
                        ><Icon name="mdi-cash-multiple" />
                        Méthode de paiement</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink class="px-5" to="/customers"
                        ><Icon name="mdi-account-box-multiple-outline" />
                        Clients</NuxtLink
                    >
                </li>
                <li><div class="divider-neutral divider"></div></li>
                <li>
                    <NuxtLink class="px-5" to="/users"
                        ><Icon name="mdi-account" /> Gerer personnel</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink class="px-5" href="" @click="logout">
                        <Icon name="mdi-logout" />Se deconnecter</NuxtLink
                    >
                </li>
            </ul>
            <div class="p-0 mx-2 flex flex-col gap-1">
                <div
                    class="bg-base-300 p-4 rounded-xl flex items-center gap-2"
                >
                    <Icon name="mdi-account"></Icon>
                    <span>{{ nameUser }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMyAuthStore } from '~/store/auth';

const authStore = useMyAuthStore();
const router = useRouter();
const logout = () => {
    authStore.clearToken();
    router.push('/auth');
};

const nameUser = computed(() => {
    if (authStore.profile) {
        return authStore.profile.nom;
    } else {
        return '';
    }
});
</script>

<style></style>
