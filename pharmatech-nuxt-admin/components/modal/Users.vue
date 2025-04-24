<template>
    <input
        v-model="modalIsOpen"
        type="checkbox"
        id="modalAddUser"
        class="modal-toggle"
    />
    <dialog id="modalAddUser" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Ajouter un nouveau admin</h3>
            <div class="py-4 flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label for="catname">Nom</label>
                    <input
                        type="text"
                        class="input input-bordered"
                        v-model="nom"
                    />
                    <small>{{ errors.nom }}</small>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="catname">Prenom</label>
                    <input
                        type="text"
                        class="input input-bordered"
                        v-model="prenom"
                    />
                    <small>{{ errors.prenom }}</small>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="catname">Email</label>
                    <input
                        type="email"
                        class="input input-bordered"
                        v-model="email"
                        @blur="verifyEmailValid"
                    />
                    <small>{{ errors.email }}</small>
                    <small v-if="emailExist" class="error"
                        >Cet email est déjà utilisé</small
                    >
                </div>
                <div class="flex flex-col gap-1">
                    <label for="catname">Telephone</label>
                    <input
                        type="tel"
                        class="input input-bordered"
                        v-model="phone"
                    />
                    <small>{{ errors.phone }}</small>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="catname">{{
                        props.userToEdit
                            ? 'Modifier le mot de passe'
                            : 'Mot de passe'
                    }}</label>
                    <input
                        type="password"
                        class="input input-bordered"
                        v-model="password"
                    />
                    <small>{{ passwordError }}</small>
                </div>
            </div>
            <div class="modal-action">
                <div class="btn btn-primary" @click="handleSave">
                    <Icon name="mdi-content-save" /> Enregistrer
                </div>

                <!-- if there is a button in form, it will close the modal -->
                <label for="modalAddUser" class="btn" @click="handleClose"
                    >Fermer</label
                >
            </div>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import { useMyCategoryStore } from '~/store/category';
import * as yup from 'yup';
import type { User } from '~/types/user.models';

const props = defineProps<{
    userToEdit?: User;
}>();

const emits = defineEmits(['save', 'close']);

const catStore = useMyCategoryStore();

const modalIsOpen = ref(false);

const { defineField, errors, validate } = useForm({
    validationSchema: yup.object({
        nom: yup.string().required(),
        prenom: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required().min(10),
    }),
});

const [nom] = defineField('nom');
const [prenom] = defineField('prenom');
const [email] = defineField('email');
const [phone] = defineField('phone');
const password = ref('');

const passwordError = ref('');
const emailExist = ref(false);

const verifyEmailValid = async () => {
    if (email.value.length > 0) {
        try {
            if (props.userToEdit) {
                if (props.userToEdit.email == email.value) {
                    emailExist.value = false;
                    return;
                } else {
                    const res = await emailValid(email.value);
                    emailExist.value = false;
                }
            } else {
                const res = await emailValid(email.value);
                emailExist.value = false;
            }
        } catch {
            emailExist.value = true;
        }
    } else {
        emailExist.value = false;
    }
};

const handleClose = () => {
    emits('close');
    
};

const handleSave = async () => {
    validate().then(async () => {
        try {
            if (!props.userToEdit) {
                if (password.value.length < 6) {
                    passwordError.value =
                        'Le mot de passe doit contenir au moins 6 caractères';
                    return;
                }
                const res = await addNewAdmin({
                    nom: nom.value,
                    prenom: prenom.value,
                    email: email.value,
                    password: password.value,
                    phone: phone.value,
                });
                if (res) {
                    getCategoryList().then((data) => {
                        catStore.categoryList = [...data];
                    });
                    modalIsOpen.value = false;
                    emits('save');
                }
            } else {
                let body: any = {
                    id: props.userToEdit.id,
                    nom: nom.value,
                    prenom: prenom.value,
                    email: email.value,
                    phone: phone.value,
                };
                if (password.value.length > 0) {
                    body = { ...body, password: password.value };
                }
                const res = await modifyAdmin(body);
                if (res) {
                    modalIsOpen.value = false;
                    emits('save');
                }
            }
        } catch (e) {
            console.log(e);
        }
    });
};

watch(
    () => props.userToEdit,
    (val) => {
        if (val) {
            nom.value = val.nom;
            prenom.value = val.prenom;
            email.value = val.email;
            phone.value = val.phone;
            // password.value = val.password;
        } else {
            nom.value = '';
            prenom.value = '';
            email.value = '';
            phone.value = '';
            password.value = '';
            passwordError.value = '';
        }
    },
);

const openModal = () => {
    modalIsOpen.value = true;
};

defineExpose({
    openModal,
});
</script>

<style scoped>
small {
    color: rgb(253, 64, 64);
}
</style>
