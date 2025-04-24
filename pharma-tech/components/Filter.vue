<template>
    <div class="p-2 flex gap-2 items-center">
        <CustomDropdown
            v-model="currCat"
            placeholder="Catégories"
            :options="categoryList"
            :option-label="'nom'"
            option-value="id"
            @change="handleApplyFilter"
        />
        <!-- <span>|</span>
        <CustomDropdown placeholder="Types" :options="categoryList" /> -->

        <span>|</span>
        <CustomDropdown
            placeholder="Prix"
            :options="priceFilter"
            option-label="label"
            option-value="value"
            @change="handleApplyFilter"
            v-model="priceFilterValue"
        />

        <span>|</span>
        <CustomDropdown
            placeholder="Préscription"
            :options="prescriptionList"
            option-label="value"
            option-value="id"
        />
        <div
            v-if="filterIsActive"
            @click="cancelFilter"
            class="btn btn-secondary"
        >
            <Icon name="mdi-close" /> Annuler les filtres
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Category } from "~/types/category.model";

const catStore = useMyCategorieStoreStore();

const emits = defineEmits(["filterChange", "filterReset"]);

const categoryList = ref<Category[]>([]);
const priceFilter = ref([
    {
        value: "asc",
        label: "Prix croissant",
    },
    {
        value: "desc",
        label: "Prix décroissant",
    },
]);
const priceFilterValue = ref();

const prescriptionList = ref([
    {
        id: 0,
        value: "Sans prescription",
    },
    {
        id: 1,
        value: "Avec prescription",
    },
]);

const filterIsActive = computed(() => {
    return currCat.value || priceFilterValue.value;
});

const currCat = ref();

categoryList.value = catStore.categorieList;

const handleApplyFilter = () => {
    emits("filterChange", {
        category: currCat.value,
        price: priceFilterValue.value,
    });
};

const cancelFilter = () => {
    currCat.value = null;
    priceFilterValue.value = null;
    emits("filterReset");
};
</script>

<style></style>
