<template>
    <div class="not-found w-full text-center">
        <h1 class="text-center p-10">404</h1>
        <p>Désolé, la page que vous voulez voir n'existe pas</p>
        <NuxtLink to="/">Retour à l'accueil</NuxtLink>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}

.not-found h1 {
    font-size: 10em;
}

.not-found p {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.not-found a {
    font-size: 1.2em;
    color: #42b983;
    text-decoration: none;
}

.not-found a:hover {
    text-decoration: underline;
}
</style>