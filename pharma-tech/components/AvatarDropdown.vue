<template>
  <div class="avatar-dropdown relative">
    <div class="avatar" @click="toggleDropdown">
      <div class="w-10 rounded-full">
        <img src="https://avatar.iran.liara.run/public/3"/>
      </div>
    </div>
    
    <ul v-if="isDropdownOpen" class="dropdown-menu">
      <li><NuxtLink to="/profile">Profile</NuxtLink></li>
      <li><NuxtLink to="/order">Commande</NuxtLink></li>
      <li><span @click="logout" class="cursor-pointer">Logout</span></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isDropdownOpen = ref(false);
const authStore = useMyAuthStoreStore();
const router = useRouter();

function toggleDropdown() {
  console.log('toggleDropdown');
  isDropdownOpen.value = !isDropdownOpen.value;
}


function handleClickOutside(event: any) {
  if (!event.target.closest('.avatar-dropdown')) {
    isDropdownOpen.value = false;
  }
}

const logout = () => {
    authStore.logout();
    useMyCartStoreStore().emptyCart();
    router.push('/');
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style lang="scss" scoped>
.avatar-dropdown {
  position: relative;
}

.avatar {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  min-width: 130px;
  top: 3rem;
  right: 0;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dropdown-menu li {
  padding: 10px;
  width: 100%;
}

.dropdown-menu li a {
  display: block;
  color: #333;
  text-decoration: none;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}

.dropdown-menu.show {
  display: block;
}
</style>

<script lang="ts" setup></script>

<style></style>
