export default defineNuxtRouteMiddleware((to, from) => {
    const authstore = useMyAuthStoreStore();
    authstore.initStore();
    const isAuthenticated = authstore.token !== null;
    console.log("isAuthenticated", isAuthenticated);

    if (
        ["/commande", "/order", "/profile"].includes(to.path) &&
        !isAuthenticated
    ) {
        return navigateTo("/#auth");
    }
});
