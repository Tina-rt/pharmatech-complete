<template>
    <div class="px-9">
        <h2 class="form-title">Mode de Paiement</h2>
        <div class="flex flex-col gap-6">
            <div class="flex flex-col">
                <div
                    class="flex items-center gap-2"
                    v-for="pm in paiementMethodList"
                >
                    <input
                        v-model="payementMethod"
                        class="radio"
                        type="radio"
                        :value="pm.id"
                        name="paiementMethod"
                        id="paiementMethodOne"
                    />
                    <div>
                        <label
                            for="paiementMethod"
                            class="font-bold radiolabel"
                            >{{ pm.nom }}</label
                        >
                        <div class="description-text">
                            {{ pm.description }}
                        </div>
                    </div>
                </div>
                <!-- <div class="ml-5 pl-3" v-if="payementMethod === 0">
                    <FormCreditCard />
                </div> -->
            </div>
            <!-- 
            <div class="flex items-center gap-2">
                <input
                    v-model="payementMethod"
                    class="radio"
                    type="radio"
                    name="paiementMethod"
                    id="paiementMethodtwo"
                    :value="1"
                />
                <div>
                    <label for="paiementMethod" class="radiolabel"
                        >Paiement à la Livraison</label
                    >
                    <div class="description-text">
                        Payer en Espèces à la livraison
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <input
                    v-model="payementMethod"
                    class="radio"
                    type="radio"
                    name="paiementMethod"
                    id="paiementMethodThree"
                    :value="2"
                />
                <div>
                    <label for="paiementMethod" class="radiolabel"
                        >Mobile Money</label
                    >
                    <div class="description-text">
                        Payer avec Airtel Money, Mvola, Orange Money
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { MethodePaiement } from "~/types/methodePaiement.models";
import { getPaymentMethods } from "~/utils/api/paiementMethod.api";

const payementMethod = ref();

const paiementMethodList = ref<MethodePaiement[]>([]);

onMounted(async () => {
    const data = await getPaymentMethods();
    paiementMethodList.value = data;
    if (data.length > 0) payementMethod.value = data[0].id;
});

defineExpose({
    payementMethod,
});
</script>

<style></style>
