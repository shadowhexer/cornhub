<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRight, mdiTrashCanOutline } from '@mdi/js';
import NavDrawer from '@/components/NavDrawer.vue';
import Header from '@/components/Scripts/Header';
import Products from '@/components/Scripts/Products';
import API from '@/services/api';
import ProductView from '@/components/ProductView.vue';
import { computed, reactive, ref, watch } from 'vue';

const product = Products.products;

// Track selected product IDs
const selectedProducts = ref<number[]>([]);

// Track whether "Select All" is checked
const selectAll = ref(false);
const isLoading = ref(false);
const total = ref(0);

// Calculate total for selected products
const calculateTotal = async () => {
    try {
        isLoading.value = true;
        await API.get('/sanctum/csrf-cookie');
        const response = await API.post('api/calculate_items', ({
            product_id: selectedProducts.value
        }));
        
        if (response.status === 200) {
        total.value = response.data.total_price;
        }
    } catch (error) {
        console.error('Failed to calculate total:', error);
    } finally {
        isLoading.value = false;
    }
};

// Toggle selection for a single product
const toggleProductSelection = async (productId: number) => {
    const index = selectedProducts.value.indexOf(productId);

    if (index === -1) {
        selectedProducts.value.push(productId);
    } else {
        selectedProducts.value.splice(index, 1);
    }

    await calculateTotal();
};

// Toggle selection for all products under a specific store
const toggleSelectStore = async (storeId: number) => {
    const store = Header.carts.find((cart) => cart.store_id === storeId);
    if (store) {
        const allProductsInStoreSelected = store.products.every((product) =>
            selectedProducts.value.includes(product.product_id)
        );

        if (allProductsInStoreSelected) {
            // Deselect all products in the store
            selectedProducts.value = selectedProducts.value.filter(
                (productId) => !store.products.some((product) => product.product_id === productId)
            );
        } else {
            // Select all products in the store
            const productIdsInStore = store.products.map((product) => product.product_id);
            selectedProducts.value = [...new Set([...selectedProducts.value, ...productIdsInStore])];
        }
    }

    await calculateTotal();
};

// Toggle selection for all products
const toggleSelectAll = async() => {
    if (selectAll.value) {
        // Select all products
        selectedProducts.value = Header.carts.flatMap((cart) =>
            cart.products.map((product) => product.product_id)
        );
    } else {
        // Deselect all products
        selectedProducts.value = [];
    }
    await calculateTotal();
};

// Watch for changes in selectedProducts
watch(selectedProducts, (newSelectedProducts: number[]) => {
    // Check if all products across all stores are selected
    const allProducts = Header.carts.flatMap((cart) =>
        cart.products.map((product) => product.product_id)
    );

    // Update selectAll based on whether all products are selected
    selectAll.value = allProducts.every((productId) =>
        newSelectedProducts.includes(productId)
    );
}, { deep: true });


// Delete selected products
const deleteSelectedProducts = async() => {
    try {
        isLoading.value = true;

        await API.get('/sanctum/csrf-cookie');
        const response = await API.delete('api/cart/delete', { data: { product_id: selectedProducts.value } });

        if(response.status === 200) {
            selectedProducts.value = []; // Clear selection
            selectAll.value = false; // Uncheck "Select All"
        }
    } catch (error) {
        console.error('Failed delete:', error);
    } finally {
        isLoading.value = false;
    }
};

// Checkout selected products
const checkoutSelectedProducts = () => {
    const selectedItems = Header.carts.flatMap((cart) =>
        cart.products.filter((product) =>
            selectedProducts.value.includes(product.product_id)
        )
    );
    console.log('Checking out:', selectedItems);
    // Add your checkout logic here
};

/*
* Quantity updater
*/
const updateQuantity = async(productId: number, event: Event) => {
    // Cast the event target to an HTMLInputElement
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    const quantity = parseInt(newValue, 10);

    if (isNaN(quantity)) {
        console.error('Invalid quantity value');
        return;
    }

    try {
        isLoading.value = true;
        const response = await API.put(`/api/cart/update/${productId}`, {
            quantity: quantity
        });

        if(response.status === 200) {
            alert(response.data.status);
        }

    } catch(error) {
        console.log('Error updating the product: ', error);
    } finally {
        isLoading.value = false
    }
};

/* 
* Dialog peoples
*/
const selectedProductId = ref<number | null>(null); // Store the selected product ID
const dialog = reactive<{ dialog: boolean[] }>({ dialog: [] }); // Store dialog toggle state
const toggle = (productId: number) => {
    selectedProductId.value = productId; // Set the selected product ID
    dialog.dialog[productId] = !dialog.dialog[productId]; // Toggle the dialog
};

</script>

<template>
    <NavDrawer />
    <v-spacer />

    <v-card variant="text" class="mt-n1" :disabled="isLoading" :loading="isLoading">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                color="green"
                height="5"
                indeterminate
            />
        </template>

        <v-row class="position-relative my-2 mx-15 px-15">
            <v-col md="7">
                <div width="800" min-height="500">
                    <div class="d-flex flex-column">

                        <v-card class="d-flex flex-row justify-space-between" width="800" height="40" rounded="b-0" variant="flat">
                            <v-card-text >
                                <v-checkbox v-model="selectAll" @change="toggleSelectAll" class="my-n6 text-button" :ripple="false">
                                    <template #label>
                                        <span class="text-caption text-uppercase">Select all</span>
                                    </template>
                                </v-checkbox>
                            </v-card-text>

                            <span class="d-flex align-center text-caption text-uppercase">
                                <v-btn variant="flat" :ripple="false" @click="deleteSelectedProducts">
                                    <svg-icon type="mdi" :path="mdiTrashCanOutline" />
                                    <v-spacer class="mx-1" />
                                    <span class="text-caption text-uppercase">Delete</span>
                                </v-btn>
                            </span>
                        </v-card>

                        <v-card v-for="(store, s) in Header.carts" :key="s" width="800" class="my-2" :rounded="false"
                            variant="flat">

                            <v-list-item-title class="mx-4 my-1 d-flex flex-row align-center">
                                <v-checkbox 
                                    class="text-button mt-n2 mb-n8" 
                                    :ripple="false"
                                    :model-value="store.products.every((product) => selectedProducts.includes(product.product_id))"
                                    @change="() => toggleSelectStore(store.store_id)"
                                    />

                                <a href="/profile" class="align-center d-flex flex-row">
                                    <span class="text-subtitle-2 text-black">{{ store.store_name }}</span>
                                    <svg-icon class="text-grey-darken-1" type="mdi" :path="mdiChevronRight"
                                        size="25"></svg-icon>
                                </a>
                            </v-list-item-title>
                            <v-divider />

                            <v-list-item-title class="mx-4 my-10 d-flex flex-row align-center"
                                v-for="(item, i) in store.products" :key="i">

                                <v-row class="align-start">

                                    <v-col cols="1" class="mr-n5">
                                        <v-checkbox 
                                        class="text-button mb-n6" 
                                        :ripple="false"
                                        :model-value="selectedProducts.includes(item.product_id)"
                                        @change="() => toggleProductSelection(item.product_id)"
                                        />
                                    </v-col>

                                    <v-col cols="2" @click.prevent="toggle(item.product_id)">
                                        <v-img :src="item.image_url[i]" height="90" width="90" aspect-ratio="1/1" cover />
                                    </v-col>

                                    <v-col cols="4" class="">
                                        <div class="mx-n8 d-flex flex-column">
                                            <button @click.prevent="toggle(item.product_id)" variant="text">
                                                <p class="text-subtitle-1 text-wrap text-left text-black"
                                                    style="line-height: 1;">{{
                                                        item.product_name
                                                    }}</p>
                                            </button>
                                            <p class="text-caption text-grey-darken-1">3 stocks left</p>

                                        </div>
                                    </v-col>

                                    <v-col cols="2" class="mx-5">
                                        <v-card-text v-if="Number(product.discount[i]) > 0"
                                            class="mb-n9 text-red text-subtitle-1 text-uppercase">PHP
                                            {{ item.price }}</v-card-text>

                                        <v-card-text>
                                            <span :class="Number(product.discount[i]) > 0 ? 'line-through text-grey' : ''"
                                                class="text-subtitle-1 text-uppercase font-weight-bold">
                                                PHP {{ product.price[i] }}
                                            </span>
                                        </v-card-text>
                                    </v-col>

                                    <v-col>

                                        <v-card width="150" height="50" class="d-flex flex-row " variant="text">
                                            <v-card-text class="text-subtitle-2">Quantity: </v-card-text>
                                            <v-text-field 
                                                density="compact" 
                                                variant="underlined" 
                                                :model-value="item.quantity"
                                                @change="(event: Event) => updateQuantity(item.product_id, event)" 
                                                min="1" 
                                                type="number"
                                                :autofocus="false" />
                                        </v-card>

                                    </v-col>

                                </v-row>

                            </v-list-item-title>
                        </v-card>
                    </div>
                </div>
            </v-col>

            <v-col cols="4" class="d-flex flex-column position-fixed" style="right: 3%;">
                <v-card class="border-sm" width="400" height="200" rounded="b-0" variant="flat"
                    style="border-color: green !important;">
                    <v-card-text class="text-uppercase border-b-sm" style="border-color: green !important;">Order
                        Summary</v-card-text>

                    <v-row>
                        <v-col cols="7">
                            <v-list-item
                                v-for="(list, l) in [`Subtotal (${selectedProducts.length} items): `, 'Shipping Fee: ', 'Total: ']"
                                :key="l" :title="list" class="text-left" />
                        </v-col>
                        <v-col>
                            <v-list-item v-for="(items, i) in [total, 0, total]" :key="i" :title="`PHP ${items}`"
                                class="text-right" />
                        </v-col>
                    </v-row>
                </v-card>
                <v-btn class="border-sm" rounded="t-0" width="400" variant="flat"
                    :text="`Check out (${selectedProducts.length}) Products`" color="yellow" @click="checkoutSelectedProducts" />
            </v-col>
        </v-row>
    </v-card>
    

    <!-- Product dialog card component -->
    <ProductView :index="selectedProductId ?? 0" :model="dialog.dialog" :profile="Header.menu.profilePic" />
</template>
<style scoped>
.line-through {
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
}

::v-deep(.v-label) {
    opacity: 1 !important;
}
</style>