<template>
    <div class="flex gap-3 w-full justify-evenly my-2 catlist">
        <NuxtLink
            class="category-item"
            v-for="(category, index) in props.categorieList"
            :key="index"
            :to="`/search?cat=${category.id}`"
        >
            {{ category.nom }}
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import type { Category } from "~/types/category.model";

const props = defineProps<{
    categorieList: Category[];
}>();
</script>

<style lang="scss" scoped>
.catlist {
    max-width: 100dvw;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    .category-item {
        text-wrap: nowrap;
    }
}
</style>
