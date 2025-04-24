// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    icon: {
      serverBundle: {
        collections: ['uil', 'mdi', 'bx', 'ri'],
      },
      clientBundle:{
        scan: true,
        sizeLimitKb: 256
      }
    },
    app: {
        head: {
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/favicon.png'
                }
            ]
        }
    },
    runtimeConfig: {
        public: {
            apiBase: ''
        }
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    routeRules: {
        '/cart': {ssr: false},
        '/search': {ssr: false},
        '/payout': {ssr: false},
        '/order': {swr: false},
        '/profile': {ssr: false}
    },

    modules: ['@nuxtjs/tailwindcss', "@nuxt/image", "@nuxt/icon", "@pinia/nuxt"],
});
