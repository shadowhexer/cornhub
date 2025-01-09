<script setup lang="ts">
import Header from './Scripts/Header';
import Product from './ProductView.vue';
import Products from '@/components/Scripts/Products';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/services/Session';
import API from '@/services/api';
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)

const products = Products.products;

const props = defineProps<{
    customClass?: string,
    searchItem: string,
}>();

// Filter items based on search query
const filteredItems = computed(() => {

    const filteredIndices = products.names
        .map((name, index) => ({ name, index }))
        .filter(({ name }) => name.toLowerCase().includes(props.searchItem.toLowerCase()))
        .map(({ index }) => index);

    return filteredIndices.map(i => ({
        id: products.product_id[i],
        names: products.names[i],
        images: products.images[i],
        store: products.store[i],
        price: products.price[i],
        discount: products.discount[i],
        category: products.category[i],
        description: products.description[i],
        originalIndex: i, // Include the original index
    }));
});

const addToBasket = async (index: number) => {
    await API.get('/sanctum/csrf-cookie').then(async () => {
        const response = await API.post('/api/cart/add', {
            product_id: products.product_id[index],
            quantity: 1,
        });

        if (response.data.status === 'success') {
            alert(response.data.status);
        }
    })
};

const itemExists = computed(() => {
    return products.names.map((item, index) => {
        return Header.carts.some((cart) =>
            cart.products.some(
                (product) =>
                    product.product_name === item &&
                    cart.store_name === products.store[index]
            )
        );
    });
});
const selectedProductId = ref<number | null>(null); // Store the selected product ID
const dialog = reactive<{ dialog: boolean[] }>({ dialog: [] });

const toggle = (productId: number) => {
    selectedProductId.value = productId; // Set the selected product ID
    dialog.dialog[productId] = !dialog.dialog[productId]; // Toggle the dialog
};

const login = () => {
    window.open('http://api.onlycorn.com:8000/login', '_blank', 'noopener,noreferrer');
}

</script>

<template>
    <div>
        <v-container>
            <v-row justify="start">
                <v-col v-for="(item, i) in filteredItems" :key="i" :class="customClass" cols="12" md="2">
                    <v-card class="mx-auto d-flex flex-column" justify="center" width="200" hover>

                        <v-card class="custom-card" @click.prevent="toggle(item.id)">
                            <div style="height: 200px;">
                                <v-img :src="item.images" aspect-ratio="5/7" height="200" width="200" cover />
                            </div>

                            <div style="height: 50px;">
                                <v-card-actions class="mx-n2 mt-n3">
                                    <v-card-text class=" truncate overflow-hidden" style="line-height: 1.1;">{{
                                        item.names
                                    }}</v-card-text>
                                    <div class="d-flex flex-column align-center">
                                        <v-btn style="pointer-events: none" icon>
                                            <svg-icon type="mdi" :path="mdiHeart" />

                                        </v-btn>
                                        <span class="mt-n3" style="font-size: 0.55rem;">200k</span>

                                    </div>
                                </v-card-actions>
                            </div>

                            <div style="height: 60px;">
                                <v-card-text v-if="Number(item.discount) > 0"
                                    class="mb-n9 text-red-darken-2 font-weight-bold">PHP
                                    {{ Products.finalPrice(item.price, item.discount) }}</v-card-text>

                                <v-card-text class="my-auto">
                                    <span :class="item.discount ? 'line-through text-grey-darken-1' : ''"
                                        class="font-weight-bold">
                                        PHP {{ item.price }}
                                    </span>

                                    <span
                                        v-if="Number(item.discount) > 0 && (item.discount as number) != (item.price as number)"
                                        class="mx-4 text-black">{{ item.discount }}% off</span>


                                </v-card-text>
                            </div>
                        </v-card>

                        <div>
                            <slot name="edit" :index="i" />
                        </div>

                    </v-card>

                    <Product :index="selectedProductId ?? 0" :model="dialog.dialog" :basket="addToBasket"
                        :exist="itemExists" :profile="Header.menu.profilePic">

                        <template #transaction="{ index }">
                            <v-card width="200" height="50" class="d-flex flex-row mx-n3" variant="text">
                                <v-card-text class="text-subtitle-2">Quantity: </v-card-text>
                                <v-text-field density="compact" variant="underlined" min="0" type="number"
                                    :autofocus="false"></v-text-field>
                            </v-card>


                            <div class="d-flex flex-row justify-space-evenly ml-n5 text-center">
                                <v-btn v-if="!itemExists[index]" width="150" height="50" variant="flat"
                                    base-color="yellow" @click.prevent="isLoggedIn ? addToBasket(index) : login()"
                                    :ripple="false">
                                    <v-card-text class="text-caption text-uppercase">Add to Basket</v-card-text>
                                </v-btn>

                                <v-btn v-else class="text-caption text-uppercase" text="Added to Basket" width="150"
                                    height="50" variant="outlined" base-color="yellow" :ripple="false" @click.prevent />


                                <v-btn width="150" height="50" class="d-flex flex-row" variant="flat"
                                    base-color="success" :ripple="false" @click.prevent="isLoggedIn ? '' : login()">
                                    <v-card-text class="text-caption text-uppercase mr-n6">Buy for </v-card-text>

                                    <div class="d-flex flex-column justify-center">
                                        <v-card-text v-if="Number(products.discount[index]) > 0"
                                            class="mb-n9 text-white text-caption text-uppercase">PHP
                                            {{ Products.finalPrice(products.price[index], products.discount[index])
                                            }}</v-card-text>

                                        <v-card-text>
                                            <span :class="Number(products.discount[index]) > 0 ? 'line-through' : ''"
                                                class="text-white text-caption text-uppercase font-weight-bold">
                                                PHP {{ products.price[index] }}
                                            </span>
                                        </v-card-text>
                                    </div>

                                </v-btn>
                            </div>
                        </template>
                    </Product>

                    <slot name="dialog" :index="i" :id="item.id" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<style scoped>
.line-through {
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
}

.truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    /* Change this to the desired number of lines */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.custom-card {
    background-color: transparent !important;
    /* Ensures no background */
    box-shadow: none !important;
    /* Removes any shadow, if any */
}

.custom-card:hover {
    background-color: transparent !important;
    /* Prevents hover effect */
}
</style>