<template>
    <div
        class="flex flex-col justify-between lg:max-w-[1454px] md:max-w-[1454px] xl:max-w-[1454px] w-full m-auto relative lg:min-h-[100dvh] xl:lg:min-h-[100dvh] md:lg:min-h-[100dvh]"
    >
        <Navbar />
        <div class="flex-1">
            <div class="px-5" v-if="!['/', '/produits'].includes($route.path)">
                <NuxtLink to="/" class="flex gap-2 items-center hover:underline italic">
                    <Icon name="mdi-arrow-left" /> <span>Retour à l'accueil</span></NuxtLink
                >
            </div>
            <slot />
        </div>
        <div class="footer-section">
            <SectionFooter />
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
