<script lang="ts" setup>
import type { MethodePaiement } from '~/types/methodePaiement.models';
import * as yup from 'yup';

const props = defineProps<{
    toEdit?: MethodePaiement;
}>();

const isLoading = ref(false);

const router = useRouter();

const { defineField, errors, validate } = useForm({
    validationSchema: yup.object({
        nom: yup.string().required('Ce champ est obligatoire'),
        description: yup.string().required('Ce Champ est obligatoire'),
    }),
});

const [nom] = defineField('nom');
const [description] = defineField('description');

const handleSubmit = async () => {
    isLoading.value = true;
    const { valid } = await validate();
    console.log(valid);
    if (valid) {
        if (props.toEdit) {
            const res = await updateMethodePaiement({
                id: props.toEdit.id,
                nom: nom.value,
                description: description.value,
            });
        } else {
            const res = await addMethodePaiement({
                nom: nom.value,
                description: description.value,
            });
        }
        isLoading.value = false;
        router.push('/paiement');
    }
    isLoading.value = false;
};

watch(
    () => props.toEdit,
    (newval) => {
        if (newval) {
            nom.value = newval.nom;
            description.value = newval.description;
        }
    },
    { immediate: true },
);
</script>

<template>
    <div class="p-4 mt-5 form-paiement">
        <label for="Designation">Designation</label>
        <div class="flex flex-col w-full">
            <input v-model="nom" type="text" class="input input-bordered" />
            <small class="text-red-500 py-2">{{ errors.nom }}</small>
        </div>
        <label for="description">Description</label>
        <div class="flex flex-col w-full">
            <textarea
                v-model="description"
                class="textarea textarea-bordered"
            ></textarea>
            <small class="text-red-500 py-2">{{ errors.description }}</small>
        </div>
        <div></div>
        <div class="flex gap-4">
            <div class="btn btn-error" @click="$router.push('/paiement')">
                Annuler
            </div>
            <div
                class="btn btn-primary"
                @click="handleSubmit"
                :class="{ 'btn-disabled': isLoading }"
            >
                <Icon
                    v-if="isLoading"
                    name="mdi-loading"
                    class="animate-spin"
                />
                {{ props.toEdit ? 'Mettre à jour' : 'Ajouter' }}
            </div>
            
        </div>
    </div>
</template>

<style scoped lang="scss">
.form-paiement {
    display: grid;
    grid-template-columns: 1fr 5fr;
    justify-items: end;
    gap: 2rem;
    max-width: 50rem;

    input,
    textarea {
        width: 100%;
    }
}
</style>
