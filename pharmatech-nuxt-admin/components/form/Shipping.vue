<script lang="ts" setup>
import * as yup from 'yup';
import { type Shipping } from '~/types/shipping.models';

const props = defineProps<{
    toEdit?: Shipping;
}>();

const toast = useToast();

const { values, defineField, errors, validate } = useForm({
    validationSchema: yup.object({
        nom: yup.string().required('Ce champ est obligatoire'),
        prix: yup.number().required('Ce champ est obligatoire'),
        description: yup.string().required('Ce champs est obligatoire'),
    }),
});

const [nom] = defineField('nom');
const [prix] = defineField('prix');
const [description] = defineField('description');


const handleSubmit = async () => {
    const { valid } = await validate();
    if (!valid) {
        return;
    }
    if (props.toEdit) {
    } else {
        const newShippingway: Shipping = {
            nom: nom.value,
            prix: prix.value,
            description: description.value,
        };
        addShippingWay(newShippingway)
            .then((res) => {
                if (res) {
                    toast.add({
                        summary: 'Nouvelle méthode de livraison ajouté !',
                        severity: 'success',
                        life: 3000,
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                toast.add({
                    summary: "Une erreur s'est produite lors de l'ajout",
                    severity: 'error',
                    life: 3000,
                });
            });
    }
};
</script>

<template>
    <div class="p-6 mt-5">
        <form
            @submit.prevent="handleSubmit"
            class="w-full items-center flex flex-col gap-6"
        >
            <div class="flex items-center gap-3 w-full">
                <div class="w-1/2 flex flex-col items-end">
                    <div class="flex w-full gap-3 items-center">
                        <label for="">Designation</label>
                        <input v-model="nom" type="text" class="input w-full" />
                    </div>
                    <small class="text-red-500 px-1">{{ errors.nom }}</small>
                </div>
                <div class="w-1/2 flex flex-col items-end">
                    <div class="flex w-full gap-3 items-center">
                        <label for="">Prix</label>
                        <input
                            v-model="prix"
                            type="number"
                            name=""
                            id=""
                            class="input w-full"
                        />
                    </div>
                    <small class="text-red-500 px-1">{{ errors.prix }}</small>
                </div>
            </div>
            <div class="w-full">
                <label for="">Description</label>
                <div class="flex gap-3 w-full items-center">
                    <textarea
                        v-model="description"
                        type="text"
                        class="textarea w-full"
                    />
                </div>
                <small class="text-red-500 px-1">{{ errors.prix }}</small>
            </div>
            <input
                type="submit"
                class="btn btn-primary my-5 w-80"
                value="Ajouter"
            />
        </form>
    </div>
</template>
