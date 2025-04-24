<template>
    <div class=" main-layout">
        <div class="p-2 w-full" style="grid-area: nav">
          <Navbar  />
        </div>
        <NavigationMenu style="grid-area: menu" />
        <div style="grid-area: main" class="pr-4 card bg-base-200 p-4 flex flex-col gap-4">

            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>

useHead({
    title: "Pharmatech Dashboard"
})

</script>

<style lang="css" scoped>
.main-layout {
    min-height: 100dvh;
    display: grid;
    grid-template-rows: 5rem 1fr;
    grid-template-columns: 15rem 1fr;
    gap: 1rem;
    grid-template-areas:
        "nav nav nav"
        "menu main main"
        "menu main main";
}
</style>
