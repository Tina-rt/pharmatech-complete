<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useMyAuthStore } from './store/auth';


const authstore = useMyAuthStore();
authstore.initToken();

</script>
