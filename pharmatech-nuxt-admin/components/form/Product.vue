<script lang="ts" setup>
import { useMyCategoryStore } from '~/store/category';
import type { Category } from '~/types/category.model';
import type { Produits } from '~/types/produits.model';
import { getCategoryList } from '~/utils/category.crud';
import * as yup from 'yup';
import { number, string } from 'yup';

useHead({
    title: 'Add Product',
});

const props = defineProps<{
    produitToEdit?: Produits;
}>();

const currentProduct = ref<Produits>({
    id: 0,
    nom: '',
    description: '',
    marque: '',
    prix: 0,
    numero_serie: '',
    caracteristique_principale: '',
    image: '',
});

const { values, handleSubmit, defineField, errors, validate } =
    useForm<Produits>({
        validationSchema: yup.object({
            nom: string().required('Ce champs est obligatoire'),
            description: string(),
            marque: string(),
            prix: number().required('Ce champs est obligatoire'),
            numero_serie: string().required('Ce champs est obligatoire'),
            caracteristique_principale: string(),
        }),
    });

const [nom, nomAttrs] = defineField('nom');
const [description, descriptionAttrs] = defineField('description');
const [marque, marqueAttrs] = defineField('marque');
const [prix, prixAttrs] = defineField('prix');
const [numero_serie, numero_serieAttrs] = defineField('numero_serie');
const [caracteristique_principale, caracteristique_principaleAttrs] =
    defineField('caracteristique_principale');

const categoryList = ref<Category[]>();
const selectedCategory = ref<Category>();

const addIsLoading = ref(false);
const showToast = ref(false);

const imageError = ref('');

const categoryStore = useMyCategoryStore();

const toast = useToast();

getCategoryList().then((data) => {
    categoryList.value = data;
    categoryStore.categoryList = [...categoryList.value];
    currentProduct.value.categorie = categoryList.value[0];
});

const inputImage = ref<HTMLInputElement | null>();
const imageFile = ref<File | null>(null);
const imageUrl = ref<string | null>(null);

const openImageDialog = () => {
    inputImage.value?.click();
};

const handleImageUploadChange = (event: Event) => {
    imageError.value = '';
    const target = event.target as HTMLInputElement;
    if (target.files) {
        imageFile.value = target.files[0];
        if (imageFile.value && imageFile.value.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl.value = e.target?.result as string;
            };
            reader.readAsDataURL(imageFile.value);
        }
    }
};

const handleSave = async () => {
    addIsLoading.value = true;
    const { valid, errors } = await validate();
    if (!imageFile.value && !props.produitToEdit || imageUrl.value === null) {
        imageError.value = 'Veuillez choisir une image';
        addIsLoading.value = false;

        return;
    }
    if (valid) {
        console.log('Valid');
        const catTemp = currentProduct.value.categorie;
        currentProduct.value = {
            ...values,
            categorie: catTemp,
        };
        let res;
        if (props.produitToEdit) {
			currentProduct.value.id = props.produitToEdit.id;
            res = await editProduits(currentProduct.value, imageFile.value!);
        } else {
            res = await addProduits(currentProduct.value, imageFile.value!);
        }
        if (res) {
            toast.add({
                summary: 'Produit ajouté avec succès',
                severity: 'success',
                life: 3000,
            });

            currentProduct.value = {
                id: 0,
                nom: '',
                description: '',
                marque: '',
                prix: 0,
                numero_serie: '',
                caracteristique_principale: '',
                image: '',
            };
            useRouter().push('/products');
        } else {
            toast.add({
                summary:
                    "Erreur lors de l'ajout du produit (Numero de serie déjà existant ou autre erreur)",
                severity: 'error',
                life: 3000,
            });
        }
    } else {
        console.log('Invalid');
    }
    addIsLoading.value = false;
};

const getBlobFromUrl = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
};

watch(
    () => props.produitToEdit,
    (produitToEdit_) => {
        if (produitToEdit_) {
            currentProduct.value = produitToEdit_;
            nom.value = produitToEdit_.nom;
            description.value = produitToEdit_.description;
            marque.value = produitToEdit_.marque;
            prix.value = produitToEdit_.prix;
            numero_serie.value = produitToEdit_.numero_serie;
            caracteristique_principale.value =
                produitToEdit_.caracteristique_principale;
            console.log(produitToEdit_);
            imageUrl.value = $renderImage(produitToEdit_.image!);
            getBlobFromUrl($renderImage(produitToEdit_.image!)).then((data) => {
                imageFile.value = new File([data], 'image.jpg', {type: data.type});
            });
        }
    },
);

</script>

<template>
    <form @submit.prevent="handleSave" class="flex flex-col gap-4">
        <div class="flex gap-4">
            <div class="w-52 h-52 bg-base-300 rounded-xl mt-3">
                <img
                    :src="imageUrl ?? 'https://via.placeholder.com/150'"
                    alt="image"
                    class="w-full h-full object-contain rounded-xl cursor-pointer"
                    @click="openImageDialog"
                />
                <input
                    required
                    class="hidden"
                    type="file"
                    accept="image/*"
                    id="image"
                    ref="inputImage"
                    name="image"
                    @change="handleImageUploadChange"
                />
                <small class="error">{{ imageError }} </small>
            </div>
            <div class="flex-1 flex flex-col gap-2 max-w-[800px]">
                <div class="flex flex-col">
                    <label for="nom">Nom</label>
                    <input
                        required
                        class="input input-bordered"
                        type="text"
                        id="nom"
                        name="nom"
                        v-model="nom"
                    />
                    <small class="error">{{ errors.nom }}</small>
                </div>
                <div class="flex flex-col">
                    <label for="description">Description</label>
                    <textarea
                        class="textarea textarea-bordered"
                        id="description"
                        name="description"
                        v-model="description"
                    ></textarea>
                </div>

                <div class="flex gap-2">
                    <div class="flex flex-col flex-1">
                        <label for="marque">Marque</label>
                        <input
                            class="input input-bordered"
                            type="text"
                            id="marque"
                            name="marque"
                            v-model="marque"
                        />
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="prix">Prix</label>
                        <input
                            required
                            class="input input-bordered"
                            type="number"
                            id="prix"
                            name="prix"
                            v-model="prix"
                        />
                        <small class="error">{{ errors.prix }}</small>
                    </div>
                    <!-- <div class="flex flex-col flex-1">
                        <label for="quantite">Quantite en stock</label>
                        <input
                            class="input input-bordered"
                            type="number"
                            id="quantite"
                            name="quantite"
                            v-model="stock"
                        />
                        <small class="error">{{ errors.stock }}</small>
                    </div> -->
                </div>

                <div class="flex gap-2 items-center">
                    <div class="flex flex-col gap-2 flex-1">
                        <label for="category" class="flex items-center gap-2">
                            <span>Category</span>
                            <ModalNewCategory />
                        </label>
                        <select
                            name="category"
                            id="cat"
                            class="select select-bordered"
                            v-model="currentProduct.categorie"
                        >
                            <option
                                :value="category"
                                v-for="category in categoryStore.categoryList"
                            >
                                {{ category.nom }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="numero_serie">Numéro de série</label>
                        <input
                            required
                            class="input input-bordered"
                            type="text"
                            id="numero_serie"
                            name="numero_serie"
                            v-model="numero_serie"
                        />
                        <small class="error">{{ errors.numero_serie }}</small>
                    </div>
                </div>
                <div class="flex gap-2">
                    <div class="flex flex-col flex-1">
                        <label for="caractprin"
                            >Caractéristique principal</label
                        >
                        <textarea
                            type="text"
                            class="textarea textarea-bordered"
                            id="caractprin"
                            v-model="caracteristique_principale"
                        ></textarea>
                        {{ errors.caracteristique_principale }}
                    </div>
                </div>
                <div class="flex gap-4 mt-5">
                    <NuxtLink to="/products" class="btn btn-error"
                        >Annuler</NuxtLink
                    >
                    <button
                        @click="handleSave"
                        class="btn btn-primary"
                        :disabled="addIsLoading"
                        :class="{
                            'btn-disabled': addIsLoading,
                        }"
                    >
                        <Icon
                            name="mdi-loading"
                            class="animate-spin"
                            v-if="addIsLoading"
                        />
                        {{ props.produitToEdit ? 'Enregistrer' : 'Ajouter' }}
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts" setup></script>

<style></style>
