// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: '',
            apiParent: '',
        },
    },
    compatibilityDate: '2024-04-03',
    ssr: false,
    css: [],
    modules: [
        '@nuxtjs/tailwindcss',
        '@primevue/nuxt-module',
        '@nuxt/icon',
        '@vee-validate/nuxt',
        '@pinia/nuxt',
        '@nuxt/image',
    ],
    primevue: {
        options: {
            theme: {
                preset: Aura,
            },
        },
    },
    devtools: { enabled: true },
});
