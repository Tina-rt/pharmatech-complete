<script lang="ts" setup></script>

<template>
    <div class="p-4">
        <h1 class="text-xl py-1">Méthode de livraison</h1>
        <div class="pt-6 flex flex-col gap-3">
            <div @click="$router.push('/shippingway/add')" class="btn btn-primary w-fit"><Icon name="mdi-plus"/> Nouveau</div>
            <DataTable>
                <Column field="id" header="Id"></Column>    
                <Column field="nom" header="Designation"></Column>    
                <Column field="description" header="Description"></Column>    
                <Column field="prix" header="Prix"></Column>    
            </DataTable>
        </div>
    </div>
</template>
