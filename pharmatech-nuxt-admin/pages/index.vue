<template>
    <div class="p-4 flex flex-col gap-3">
        <div class="flex justify-between">
            <h1 class="text-3xl">Dashboard</h1>
        <div class="btn btn-ghost w-fit" @click="exportToPdf">
            <Icon name="mdi-export" /> Export
        </div>
        </div>
        <div class="p-4 flex flex-col gap-6" id="dashboardtoexport">
            <div class="flex w-full justify-center gap-10">
                <CardStats
                    :amount="dashboardData?.recetteTotal.toLocaleString()"
                    subtitle="Recette total"
                    unit="Ar"
                />
                <CardStats
                    :amount="dashboardData?.commandes.length"
                    subtitle="Nombre total de commande"
                />
                <CardStats
                    :amount="dashboardData?.produits"
                    subtitle="Nombre de produits en ligne"
                />
            </div>
            <div class="p-4 w-full grid grid-cols-2 gap-10">
                <ChartSales :data="dashboardData?.salesAmountGraph" />
                <ChartProduct :data="dashboardData?.orderedProduitGraph" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

const dashboardData = ref<{
    orderedProduitGraph?: any;
    salesAmountGraph?: any;
    salesDataGraph?: any;
    commandes: any;
    recetteTotal: number;
    totalProduitsCommandee: number;
    produits: number;
}>();

getDashboardData().then((data) => {
    console.log(data);
    dashboardData.value = data;
});

const exportToPdf = () => {
    
    htmlToImage
        .toJpeg(document.getElementById('dashboardtoexport')!, {
            quality: 0.95,
        })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'dashboard.jpg';
            link.href = dataUrl;
            link.click();
        });
};
</script>

<style></style>
