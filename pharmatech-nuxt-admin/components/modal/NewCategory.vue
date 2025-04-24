<template>
	<label for="modalAddCat" class="btn btn-ghost rounded-full h-4 min-h-1" onclick="my_modal_1.showModal()"> <Icon name="mdi-plus"/> </label>
	<input v-model="modalIsOpen" type="checkbox" id="modalAddCat" class="modal-toggle" />
	<dialog id="modalAddCat" class="modal">
		<div class="modal-box">
			<h3 class="text-lg font-bold">Add a new Category</h3>
			<div class="py-4">
				<div class="flex flex-col gap-2">
				<label for="catname">Name</label>
				<input type="text" class="input input-bordered" v-model="currentCatName" />
				</div>
			</div>
			<div class="modal-action">	
				<div class="btn btn-primary" @click="handleSave" :class="{'btn-disabled': currentCatName.length === 0}"> <Icon name="mdi-content-save"/> Save</div>
				
					<!-- if there is a button in form, it will close the modal -->
					<label for="modalAddCat" class="btn">Close</label>
				
			</div>
		</div>
	</dialog>
</template>

<script lang="ts" setup>
import { useMyCategoryStore } from '~/store/category';


const currentCatName = ref('');

const catStore = useMyCategoryStore();

const modalIsOpen = ref(false);

const handleSave = async () => {
	if (currentCatName.value.length > 0){
		const res = await addCategory(currentCatName.value);
		if (res){
			getCategoryList().then((data)=>{
				catStore.categoryList = [...data];
			})
			modalIsOpen.value = false;
		}
	}
}

</script>

<style></style>
