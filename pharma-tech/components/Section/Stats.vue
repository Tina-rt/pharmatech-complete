<template>
    <div class="flex gap-4 flex-wrap md:justify-between lg:justify-between xl:justify-between w-full justify-center px-4 md:p-0 lg:p-0 xl:p-0">
        <CardStats
            v-for="stat in stats"
            :key="stat.title"
            :number="stat.number"
            :title="stat.title"
            :icon="stat.icon"
            :color="stat.color"
            class=""
        />
    </div>
</template>

<script lang="ts" setup>
const stats = ref([
    {
        number: "14k+",
        title: "Commandes complétées",
        icon: "mdi:cart-check",
        color: '--vert-clair-1'
    },
    {
        number: "250+",
        title: "Trophées gagnés",
        icon: "mdi:trophy",
        color: '--rose-clair'
    },
    {
        number: "8k+",
        title: "Client satisfait",
        icon: "mdi:emoticon-happy",
        color: '--vert-clair-2'
    },
    {
        number: "12k+",
        title: "Avis positifs",
        icon: "mdi:comment-check-outline",
        color: '--violet-clair'
    },
]);
</script>

<style></style>
