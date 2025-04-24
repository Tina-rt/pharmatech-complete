<template>
    <div
        class="flex justify-between items-end gap-5 flex-wrap my-hero px-5 pt-4"
    >
        <div
            class="flex flex-col flex-1 p-1 md:px-4 lg:px-4 xl:px-4 gap-3 justify-evenly items-center lg:items-start md:items-start py-5 h-full lg:min-h-[500px] lg:max-w-[40%]"
        >
            <h1 class="title">Pharmatech Votre Santé En Un Seul Clic!</h1>
            <p class="text-center md:text-left lg:text-left xl:text-left">
                Élevez votre parcours de santé avec des réductions exclusives et
                une commodité inégalée. Votre chemin vers le bien-être commence
                ici, où chaque achat est une ordonnance pour des économies.
            </p>
            <div>
                <button class="btn" @click="$router.push('/produits')">
                    Commander Maintenant <Icon name="uil:shopping-bag" />
                </button>
            </div>
        </div>
        <div class="hero-img lg:min-h-[500px]">
            <img src="/img/hero.png"></img>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.my-hero {
    background-color: var(--vert-fonce);
    color: white;
    height: auto;

    @media screen and (max-width: 786px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    
}
.hero-img {
    width: 50%;
    display: flex;
    align-items: end;
    justify-content: center;
    max-height: 100%;
    height: 100%;

    @media screen and (max-width: 786px) {
        width: 100%;
        // height: 50%;
    }

    img {
		width: 100%;
        height: 100%;
        max-height: 500px;
        object-fit: contain;
    }
}
</style>
