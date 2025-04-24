<template>
    <div class="w-full h-full grid place-items-center">
        <div
            class="card bg-base-100 w-11/12 sm:w-1/3 sm:max-w-[400px] shadow-xl p-3"
        >
            <h1
                class="card-title flex w-full justify-center text-3xl text-center"
            >
                Pharmatech-Admin Login
            </h1>
            <div class="card-body">
                <div class="alert alert-error" v-if="error">
                    Erreur de connexion, Verifier vos identifiants
                </div>
                <form @submit.prevent="submit" class="flex flex-col gap-4 my-4">
                    <input
                        type="email"
                        class="input input-bordered form-control"
                        placeholder="Email"
                        v-model="email"
                    />
                    <input
                        type="password"
                        class="input input-bordered form-control"
                        placeholder="Mot de passe"
                        v-model="password"
                    />
                    <button
                        type="submit"
                        class="btn btn-primary"
                        value="Submit"
                        :disabled="isLoading"
                    > <Icon v-if="isLoading" name="mdi-loading" :class="{'animate-spin btn-disabled': isLoading}"/> Se connecter</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMyAuthStore } from '~/store/auth';

definePageMeta({
    layout: 'loginlayout',
});

const email = ref('');
const password = ref('');
const apiBase = useRuntimeConfig().public.apiBase;

const error = ref(false);
const authStore = useMyAuthStore();
const router = useRouter();
const isLoading = ref(false);

console.log(apiBase);

const submit = () => {
    error.value = false;
    isLoading.value = true;
    $api('auth/connexion/admin', {
        headers: {},
        method: 'POST',
        body: {
            email: email.value,
            motdepasse: password.value,
        },
    })
        .then((res) => {
            console.log(res);
            const { status, token } = res;
            console.log(status, token);

            authStore.setToken(token);
            router.push('/');
        })
        .catch((e) => {
            error.value = true;
            console.log(e);
        }).finally(()=>{
            isLoading.value = false;
        });
};
</script>

<style></style>
