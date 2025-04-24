<template>
    <div class="px-9">
        <h2 class="form-title">Information de l'Acheteur</h2>
        <div
            class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-4"
        >
            <div class="flex flex-col">
                <label for="nom">Nom*</label>
                <TextInput
                    v-model="nom"
                    type="text"
                    nom="nom"
                    id="nom"
                    class="input input-bordered"
                />
                <small class="input-error">{{ errors.nom }}</small>
            </div>
            <div class="flex flex-col">
                <label for="prenom">Prénom*</label>
                <TextInput
                    v-model="prenom"
                    type="text"
                    nom="prenom"
                    id="prenom"
                    class="input input-bordered"
                />
                <small class="input-error">{{ errors.prenom }}</small>
            </div>
            <div class="flex flex-col">
                <label for="email">Email*</label>
                <TextInput
                    v-model="email"
                    type="email"
                    nom="email"
                    id="email"
                    class="input input-bordered"
                />
                <small class="input-error">{{ errors.email }}</small>

            </div>
            <div class="flex flex-col">
                <label for="email">Téléphone*</label>
                <TextInput
                    v-model="phone"
                    type="tel"
                    nom="phone"
                    id="phone"
                    class="input input-bordered"
                />
                <small class="input-error">{{ errors.phone }}</small>

            </div>
            <div class="flex flex-col">
                <label for="email">Adresse*</label>
                <TextInput
                    v-model="adresse"
                    type="text"
                    nom="adresse"
                    id="adresse"
                    class="input input-bordered"
                />
                <small class="input-error">{{ errors.adresse }}</small>

            </div>
            <div class="flex flex-col">
                <label for="prescription">Préscription*</label>
                <FileInput />
            </div>
            <div class="flex flex-col">
                <label for="ville">Ville*</label>
                <input
                    v-model="ville"
                    type="text"
                    nom="ville"
                    id="ville"
                    class="input input-bordered"
                />
                <small class="input-error">{{ errors.ville }}</small>

            </div>
            <div class="flex flex-col">
                <label for="code_postal">Code Postale*</label>
                <input
                    v-model="code_postal"
                    type="text"
                    nom="code_postal"
                    id="code_postal"
                    class="input input-bordered"
                />
                <small class="input-error">{{ errors.code_postal }}</small>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

const thisFieldIsRequiredMsg = 'Ce champ est obligatoire';
const { values, defineField, validate, errors } = useForm({
    validationSchema: yup.object({
        nom: yup.string().required(thisFieldIsRequiredMsg),
        prenom: yup.string().required(thisFieldIsRequiredMsg),
        email: yup.string().email('Entrez une adresse mail valide').required(thisFieldIsRequiredMsg),
        phone: yup.string().required(thisFieldIsRequiredMsg),
        adresse: yup.string().required(thisFieldIsRequiredMsg),
        ville: yup.string().required(thisFieldIsRequiredMsg),
        code_postal: yup.string().required(thisFieldIsRequiredMsg),
    }),
});

const [nom] = defineField("nom");
const [prenom] = defineField("prenom");
const [email] = defineField("email");
const [phone] = defineField("phone");
const [adresse] = defineField("adresse");
const [ville] = defineField("ville");
const [code_postal] = defineField("code_postal");


defineExpose({
    validate,
    values
})

</script>

<style></style>
