<template>
    <div>
        <dialog id="auth" class="modal modal-bottom sm:modal-middle">
            <div
                class="modal-box sm:min-w-[400px] px-0 py-4 relative modal-scroll flex flex-col"
            >
                <div class="flex w-full justify-between p-5">
                    <h3 class="text-xl font-bold">
                        {{ isLogin ? "Se connecter" : "Inscription" }}
                    </h3>
                    <form method="dialog">
                        <button
                            class="btn btn-sm btn-square btn-ghost"
                            aria-label="Close"
                            @click="closeModal"
                        >
                            <Icon name="mdi-close" />
                        </button>
                    </form>
                </div>
                <div class="modal-body flex-1 overflow-y-auto px-6 pb-6">
                    <div class="alert alert-success mb-4" v-if="accountIsCreated">
                        Votre compte a été crée ! Vous pouvez maintenant
                        utiliser votre email et mot de passe pour vous connecter !
                    </div>

                    <FormLogin @signup="handleGoSignup" @login-success="closeModal" v-if="isLogin" />
                    <FormCreateAccount @login="isLogin = true" @create-account-success="handleCreateAccountOk" v-else />
                </div>
            </div>
        </dialog>
    </div>
</template>

<script lang="ts" setup>
const isLogin = ref(true);

const accountIsCreated = ref(false);

const handleCreateAccountOk = () => {
    isLogin.value = true;
    accountIsCreated.value = true;
};

const handleGoSignup = () => {
    isLogin.value = false;
    accountIsCreated.value = false;
};

const closeModal = () => {
    window.location.hash = "";
}
</script>

<style></style>
