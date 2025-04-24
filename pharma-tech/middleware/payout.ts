export default defineNuxtRouteMiddleware((to, from) => {
    const cartStore = useMyCartStoreStore();

    if (to.path === "/payout" && cartStore.cartStore.length === 0) {
        return navigateTo("/cart");
    }
    
});