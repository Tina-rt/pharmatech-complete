<template>
    <div class="flex flex-col gap-4">
        <form @submit="onSubmit" class="flex flex-col gap-5">
            <div
                class="alert alert-error text-white"
                v-if="apiError.length > 0"
            >
                {{ apiError }}
            </div>
            <div class="flex flex-col">
                <label for="email">Adresse Email</label>
                <input
                    v-model="email"
                    v-bind="emailAttrs"
                    type="email"
                    name="email"
                    class="input input-bordered"
                />
                <small class="p-1 text-red-500">{{
                    capitalize(errors.email ?? "")
                }}</small>
            </div>
            <div class="flex flex-col">
                <label for="password">Mot de passe</label>
                <input
                    v-model="password"
                    v-bind="passwordAttrs"
                    type="password"
                    name="password"
                    class="input input-bordered"
                />
                <small class="p-1 text-red-500">{{ errors.password }}</small>
            </div>
            <div class="flex flex-col">
                <button
                    class="btn btn-primary"
                    value="submit"
                    :disabled="btnIsLoading"
                >
                    <Icon
                        name="mdi-loading"
                        class="loading-spinner"
                        v-if="btnIsLoading"
                    />Se connecter
                </button>
            </div>
        </form>
        <div class="text-center flex flex-col">
            <NuxtLink>Mot de passe oublié ?</NuxtLink>
            <div>
                Vous n'avez pas de compte ?
                <span class="link text-primary" @click="emits('signup')"
                    >S'inscrire ici</span
                >
            </div>
        </div>
        <div>
            <div class="divider">Ou se connecter avec</div>
            <div class="flex gap-5 w-full justify-center">
                <button class="btn btn-square btn-ghost">
                    <Icon
                        size="50"
                        name="mdi-google"
                        class="text-red-600 font-bold"
                    />
                </button>
                <button class="btn btn-square btn-ghost">
                    <Icon size="50" name="mdi-facebook" class="text-blue-400" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { login } from "~/utils/api/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";

const { capitalize } = useFormatString();
const authStore = useMyAuthStoreStore();
const emits = defineEmits(["login", "signup", "loginSuccess"]);
const apiError = ref("");

const btnIsLoading = ref(false);

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        email: yup
            .string()
            .email("Veuillez entrer un email valide")
            .required("Ce champ est obligatoire"),
        password: yup.string().required("Le mot de passe est requis"),
    }),
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const processLogin = async () => {
    apiError.value = "";
    btnIsLoading.value = true;
    const response = await login(email.value, password.value);
    if (response.status === 200 || response.status === 201) {
        // Do something
        // console.log(response.data.token);
        authStore.login(response.data.token, {
            email: email.value,
        });
        emits("loginSuccess");
    } else if (response.status === "fail") {
        // Do something
        apiError.value = response.message;
    }
    btnIsLoading.value = false;
};
const onSubmit = handleSubmit((values) => {
    processLogin();
});
</script>

<style></style>
