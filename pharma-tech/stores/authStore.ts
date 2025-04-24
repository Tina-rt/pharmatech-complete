import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useMyAuthStoreStore = defineStore("myAuthStoreStore",{
    state: () => ({
        token: null as any,
        user: null as any,
    }),
    actions: {
        initStore() {
            const cookie = useCookie("token");

            if (cookie.value && cookie.value.length > 0) {
                this.token = cookie.value;
                return;
            }
            this.getCurrentUser();
        },
        login(token: any, user: any) {
            this.token = token;
            this.user = user;
            const cookie = useCookie("token");
            cookie.value = token;
        },
        logout() {
            this.token = null;
            this.user = null;
            const cookie = useCookie("token");
            cookie.value = null;
        },

        async getCurrentUser() {
            const cookie = useCookie("token");
            if (cookie.value) {
                const decoded = jwtDecode(cookie.value) as any;
                const id = decoded["id"];
                if (id) {
                    try {
                        const { data } = await $api("utilisateur/client/" + id);
                        this.user = data;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        },
    },
});
