<template>
    <div
        class="p-5 px-8 flex flex-col gap-4 items-center bg-white sticky top-0 z-50"
    >
        <div class="flex justify-between w-full">
            <div class="flex items-center">
                <NuxtLink to="/">
                    <img src="/img/logo_pharmatech.png" width="100" />
                </NuxtLink>
            </div>
            <div
                class="hidden lg:flex md:flex search-group flex-1 max-w-[900px] border-2 border-r-5 items-center bg-slate-50 justify-between rounded-xl"
            >
                <CustomDropdown
                    :placeholder="'Categorie'"
                    :options="categoryList"
                    :option-label="'nom'"
                    :option-value="'id'"
                    class="min-w-[140px]"
                    v-model="currentCategory"
                />
                <div class="border-r-2 h-2/3 w-1"></div>
                <input
                    v-model="searchkw"
                    @keyup.enter="handleSearch"
                    type="text"
                    class="search-input input form-control bg-transparent flex-1 outline-none"
                    placeholder="Rechercher des produits médicales"
                />

                <div
                    class="btn btn-ghost mr-1"
                    v-if="searchkw.length > 0"
                    @click="searchkw = ''"
                >
                    <Icon name="mdi-close" />
                </div>

                <button
                    @click="handleSearch"
                    type="submit"
                    class="search-button btn btn-primary"
                >
                    <Icon name="uil:search" />
                </button>
            </div>
            <div class="actions">
                <div v-if="!isConnected" class="btn btn-primary">
                    Se connecter
                </div>
                <div v-else class="flex items-center gap-4">
                    <!-- <button class="btn btn-ghost">
                        <Icon name="mdi:bell-badge-outline" size="20" />
                    </button> -->
                    <div class="indicator ml-2">
                        <span
                            class="indicator-item badge badge-primary badge-sm"
                            >{{
                                cartItemCount > 9 ? "+9" : cartItemCount
                            }}</span
                        >
                        <div>
                            <NuxtLink
                                to="/cart"
                                :class="{ 'btn-circle': cartItemCount > 0 }"
                                class="btn p-2"
                            >
                                <Icon name="uil:shopping-bag" size="20" />
                            </NuxtLink>
                        </div>
                    </div>
                    <AvatarDropdown v-if="authStore.token" />
                    <template v-else>
                        <button @click="openAuthModal" class="btn btn-primary">
                            Se connecter
                        </button>
                    </template>
                </div>
            </div>
        </div>
        <CategorieListInline
            :categorie-list="categoryList"
            class="hidden md:flex lg:flex xl:flex"
        />
    </div>
    <ModalAuth />
</template>

<script lang="ts" setup>
import type { Category } from "~/types/category.model";
import { searchProduit } from "~/utils/api/search.api";

const cartStore = useMyCartStoreStore();
const authStore = useMyAuthStoreStore();
const catStore = useMyCategorieStoreStore();

const cartItemCount = computed(() => {
    return cartStore.cartStore.length;
});

const router = useRouter();
const route = useRoute();

const currentCategory = ref();

const categoryList = ref<Category[]>([]);
categoryList.value = catStore.categorieList;
const isConnected = ref(true);

const openAuthModal = () => {
    window.location.hash = "auth";
};

const searchkw = ref("");
const handleSearch = () => {
    let searchUrl = `/search?q=${searchkw.value}`;
    if (currentCategory.value) {
        searchUrl += `&cat=${currentCategory.value}`;
    }
    router.push(searchUrl);
};
const getCategorieList = async () => {
    const { data } = await $api("categorie");
    categoryList.value = data;
};

watch(()=> route.path, () => {
    searchkw.value = '';
    currentCategory.value = null;
    
})

// await getCategorieList();
</script>

<style lang="scss" scoped>
.search-input {
    outline: none;
    border: none;
}

.search-input:focus {
    outline: none;
}
</style>
