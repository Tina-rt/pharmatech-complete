<template>
    <div class="p-5 gap-8 flex items-center flex-col">
        <h2 class="text-2xl font-bold">Mon profil</h2>
        <div class="flex flex-col items-center gap-5">
            <div class="img-profile">
                <img
                    src="https://avatar.iran.liara.run/public/3"
                    alt=""
                    width="200"
                />
            </div>
            <div class="ml-5">
                <div class="grid grid-cols-2 profile-info items-center gap-2">
                    <div>Nom</div>
                    <div>
                        <input
                            type="text"
                            class="input input-bordered"
                            v-model="nom"
                            @keydown="handleChange"
                        />
                    </div>
                    <div>Prénoms</div>
                    <div>
                        <input
                            type="text"
                            class="input input-bordered"
                            v-model="prenom"
                            @keydown="handleChange"
                        />
                    </div>
                    <div>Email</div>
                    <div>
                        <input
                            type="email"
                            class="input input-bordered"
                            v-model="email"
                            @keydown="handleChange"
                        />
                    </div>
                </div>
                <div class="w-full flex justify-end mt-5">
                    <button
                        @click="handleSave"
                        class="btn btn-primary"
                        :disabled="!isEdit"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
        <Toast ref="toast" />
    </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { updateProfile } from "~/utils/api/profile.api";

const authStore = useMyAuthStoreStore();
const router = useRouter();
const toast = ref();

// await authStore.getCurrentUser();

const { defineField, errors } = useForm({
    validationSchema: yup.object({
        nom: yup.string().required(),
        prenom: yup.string().required(),
        email: yup.string().email().required(),
    }),
    initialValues: {
        nom: authStore.user?.nom,
        prenom: authStore.user?.prenom,
        email: authStore.user?.email,
    },
});

const [nom] = defineField("nom");
const [prenom] = defineField("prenom");
const [email] = defineField("email");

const isEdit = ref(false);

const handleChange = () => {
    isEdit.value = true;
};

authStore.getCurrentUser().then(() => {
    nom.value = authStore.user?.nom;
    prenom.value = authStore.user?.prenom;
    email.value = authStore.user?.email;
    console.log(authStore.user);
});

const handleSave = () => {
    updateProfile(authStore.user?.id, nom.value, prenom.value, email.value).then((res) => {
        if (res) {
            toast.value.show("Profil modifié !");
            isEdit.value = false;
        }
    });
};
</script>

<style scoped lang="scss">
.profile-info {
    div:nth-child(odd) {
        font-weight: bold;
    }
}
</style>
