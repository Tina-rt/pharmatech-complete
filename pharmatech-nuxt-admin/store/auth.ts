import { jwtDecode } from 'jwt-decode';

export const useMyAuthStore = defineStore({
    id: 'myAuthStore',
    state: () => ({
        token: '',
        profile: null as any,
    }),
    actions: {
        initToken() {
            const cookie = useCookie('token');
            this.token = cookie.value ?? '';
            // getUserById()
            if (this.token.length > 0) {
                const decoded = jwtDecode(this.token) as any;
                const id = decoded['id'];
                if (id) {
                    getUserById(+id)
                        .then((data) => {
                            if (data) this.profile = data;
                        })
                        .catch((e) => {
                            console.log('Unable to get profile');
                        });
                }
            }
        },
        setToken(_token: string) {
            this.token = _token;
            const cookie = useCookie('token');
            cookie.value = _token;
            this.initToken();
        },
        clearToken() {
            const cookie = useCookie('token');
            this.token = '';
            cookie.value = '';
        },
        logout() {
            this.clearToken();
            this.profile = null;
        }
    },
});
