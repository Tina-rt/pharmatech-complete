<template>
    <input  v-on:change="onFileChange"  type="file" class="file-input  file-input-bordered file-input-accent w-full max-w-xs" />
</template>

<script lang="ts" setup>

const emits = defineEmits(['change'])

const onFileChange = (e: any)=>{
  let files = e.target?.files || e.dataTransfer.files;
  if (!files.length){
    return;
  }
  emits('change', files[0]);
}

</script>

<style></style>
