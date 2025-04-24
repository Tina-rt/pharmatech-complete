import { useMyAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useMyAuthStore();
    authStore.initToken();
    if (to.path === '/auth') {
        if (authStore.token.length > 0) {
            return navigateTo('/');
        }
    } else {
        if (authStore.token.length === 0) {
            return navigateTo('/auth');
        }
    }
});
