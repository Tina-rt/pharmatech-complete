<template>
    <div class="about-us w-full p-2 flex justify-between h-full">
        <div class="flex flex-col gap-4 lg:w-[30%] md:w-[30%] xl:w-[30%] w-full justify-evenly items-center lg:items-start md:items-start xl:items-start">
            <div class="flex flex-col  items-center lg:items-start md:items-start xl:items-start gap-1">
                <span>Qui sommes nous ?</span>
                <h1>À Propos de Pharmatech</h1>
            </div>
            <p class="text-center lg:text-left xl:text-left md:text-left">
                Chez Pharmatech, nous nous engageons à vous offrir une
                expérience d'achat en ligne de produits de santé simple, sûre et
                rapide. Notre mission est de rendre les produits de santé
                accessibles à tous, tout en garantissant des services de qualité
                et une satisfaction client optimale.
            </p>
            <div class="btn btn-primary w-fit px-6">
                Lire Plus <Icon name="material-symbols:arrow-right-alt" />
            </div>
        </div>
        <div class="img-section hidden lg:block md:block xl:block">
            <img src="/assets/img/aboutimg.svg" />
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.about-us {
    background-color: var(--violet-clair);
    padding: 2rem;

    @media screen and (max-width: 768px) {
        background-color: white;       
    }

    h1 {
        font-size: 2rem;
        font-weight: bold;
    }

	.img-section{
		width: 50%;
	}
}
</style>
