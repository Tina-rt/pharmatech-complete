<template>
  <div class="flex gap-2 w-full" >
    <img :src="img" v-for="img in cardImgList"/>
  </div>
</template>

<script lang="ts" setup>


const cardImgList = ref([
    'img/card/Visa.png',
    'img/card/Discover Card.png',
    'img/card/American Express.png',
    'img/card/MasterCard.png',
])

</script>

<style>

</style>