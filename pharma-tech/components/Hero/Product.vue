<template>
    <div class="banniere">
        <div class="img-container">
            <img src="/img/hero-Product 1.png" alt="" />
        </div>
        <h1 class="title">Nos Produits</h1>
        <div class="img-search-container">
            <div class="img-search">
                <span>Rechercher à l'aide d'une Photo</span>
                <span><Icon name="uil:image-upload" size="60" /></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.banniere {
    background-color: var(--vert-fonce);
    color: white;
    max-height: 260px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
        // font-size: ;
        max-width: 33%;
        width: 33%;
    }

    .img-container {
        max-height: 150px;
        max-width: 33%;
        img {
            height: 150px;
            width: auto;
            // object-fit: contain;
        }
    }
    .img-search-container {
        background-color: white;
        height: 160px;
        width: 300px;
        padding: 10px;
        margin: 20px;
        border-radius: 5px;
        .img-search {
            border-radius: 5px;

            width: 100%;
            height: 100%;
            background-color: white;
            border: 5px dashed var(--vert-fonce);
            color: var(--vert-fonce);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            font-size: 18px;
            font-weight: 700;
        }
    }
}
</style>
