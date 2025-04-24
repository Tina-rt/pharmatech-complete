<template>
    <div class="card-promo-produits flex">
        <div class="info-produit">
			<div class="badge">{{ props.produits.reduction }}% OFF</div>
            <h3  :class="{'big': props.isBig}">{{ props.produits.nom }}</h3>
            <p class="description" :class="{'big': props.isBig}">{{ props.produits.description }}</p>
			<p class="prev-price">{{ $formatCurrency(props.produits.prix) }}</p>
			<p class="new-price">{{ $formatCurrency(props.produits.prix) }}</p>
        </div>
        <div class="img-produit">
            <img :src="props.produits.image" alt="" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Produits } from "~/types/produits.model";

const props = defineProps<{
    produits: Produits;
	isBig?: boolean;
}>();
</script>

<style lang="scss" scoped >
.card-promo-produits{
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-width: 400px;
	width: 100%;
	height: 100%;
	// max-width: 400px;
	box-shadow: 0px 4px 26px 0px #0000001A;
	@media screen and (max-width: 786px) {
		min-width: 100%;
		
	}
	.img-produit{
		width: 50%;
		padding: 1rem;
		img{
			width: 100%;
			height: 100%;
			max-height: 100%;
			object-fit: contain;
			border-radius: 12px 12px 0 0;
		}
	}

	.info-produit{
		// width: 100%;
		padding: 1rem;
	}
	h3 {
		font-size: 1.5rem;
		font-weight: bold;
	}
	h3.big{
		font-size: 2.25rem;
	}
	.badge{
		background-color: var(--vert-principal);
		color: white;
		padding: 1rem;
		border-radius: 5px;
	
	}
	.description.big{
		font-size: 2rem;
	}

	.description{
		font-size: 1.3rem;
	}

	

	.prev-price{
		text-decoration: line-through;
	}
	.new-price{
		font-size: 1.6rem;
		font-weight: bold;
	}
}

</style>
