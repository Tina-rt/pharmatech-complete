<template>
    <div class="flex flex-col gap-4">
        <form @submit="onSubmit" class="flex flex-col gap-3">
            <div
                class="alert alert-error text-white"
                v-if="apiError.length > 0"
            >
                {{ apiError }}
            </div>
            <div class="flex gap-2 w-full sm:flex-row flex-col">
                <div class="flex flex-col flex-1">
                    <label for="name">Nom</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        class="input input-bordered"
                        v-model="nom"
                    />
                    <small class="input-error">{{ errors.nom }}</small>
                </div>
                <div class="flex flex-col flex-1">
                    <label for="firstname">Prenom</label>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Prenom"
                        class="input input-bordered"
                        v-model="prenom"
                    />
                    <small class="input-error">{{ errors.prenom }}</small>
                </div>
            </div>

            <div class="flex flex-col">
                <label for="email">Adresse Email</label>
                <input
                    type="email"
                    name="email"
                    class="input input-bordered"
                    placeholder="example@mail.com"
                    v-model="email"
                />
                <small class="input-error">{{ errors.email }}</small>
            </div>
            <div class="flex flex-col">
                <label for="password">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    class="input input-bordered"
                    v-model="password"
                />
                <small class="input-error">{{ errors.password }}</small>
            </div>
            <div class="flex flex-col">
                <label for="confirmPassword"
                    >Confirmer votre mot de passe</label
                >
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmer votre mot de passe"
                    class="input input-bordered"
                    v-model="confirmPassword"
                />
                <small class="input-error">{{ errors.confirmPassword }}</small>
            </div>
            <div class="flex flex-col">
                <label for="tel">Téléphone</label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"
                    >
                        <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 19 18"
                        >
                            <path
                                d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="tel"
                        id="phone-input"
                        aria-describedby="helper-text-explanation"
                        class="input input-bordered text-gray-900 rounded-lg block w-full ps-10 p-2.5"
                        placeholder="03X-12-345-67"
                        required
                        v-model="phone"
                    />
                </div>
            </div>
            <div class="flex flex-col">
                <button
                    class="btn btn-primary"
                    value="submit"
                    :disabled="btnIsLoading"
                >
                    <Icon v-if="btnIsLoading" name="mdi:loading" class="loading-spinner"></Icon>
                    S'inscrire
                </button>
            </div>
        </form>

        <div>
            <div class="flex gap-2 justify-center">
                <span>Vous avez déjà un compte ?</span>
                <span class="link text-primary" @click="emits('login')"
                    >Se connecter</span
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { register } from "~/utils/api/auth";

const { capitalize } = useFormatString();

const emits = defineEmits(["login", "signup", "createAccountSuccess"]);

const apiError = ref("");

const btnIsLoading = ref(false);

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        nom: yup.string().required("Ce champ est obligatoire"),
        prenom: yup.string().required("Ce champ est obligatoire"),
        phone: yup.string().required("Ce champ est obligatoire"),
        email: yup
            .string()
            .email("Veuillez entrer un email valide")
            .required("Ce champ est obligatoire"),
        password: yup
            .string()
            .min(6, "Le mot de passe doit avoir au moins 6 caractères")
            .required("Le mot de passe est requis"),
        confirmPassword: yup
            .string()
            .oneOf(
                [yup.ref("password")],
                "Les mots de passe ne correspondent pas"
            )
            .required("Ce champ est obligatoire"),
    }),
});

const [nom] = defineField("nom");
const [prenom] = defineField("prenom");
const [phone] = defineField("phone");
const [email] = defineField("email");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");

const onSubmit = handleSubmit(async () => {
    apiError.value = "";
    btnIsLoading.value = true;
    const response = await register({
        nom: nom.value,
        prenom: prenom.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
    });

    if ("status" in response) {
        if (response.status === "fail") {
            // emits("login");
            console.log(response.message);
            apiError.value = capitalize(response.message);
        } else if (response.status === 201) {
            console.log(response.message);
            emits("createAccountSuccess");
        }
    }
    console.log(response);
    btnIsLoading.value = false;
    // emits("login");
});
</script>

<style></style>
