<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRight } from '@mdi/js';
import NavDrawer from '@/components/NavDrawer.vue';
import Header from '@/components/Scripts/Header';
import Products from '@/components/Scripts/Products';
import ProductView from '@/components/ProductView.vue';
import { reactive, ref } from 'vue';

const product = Products.products;

const i = ref<number>(0); // Create a ref variable to store the index of the Product component
const dialog = reactive<{ dialog: boolean[] }>({ dialog: [] });

const toggle = (index: number) => {
    dialog.dialog[index] = !dialog.dialog[index];

    i.value = index; // Assign the index to the ref variable every time the dialog is toggled
};

</script>

<template>
    <NavDrawer />
    <v-spacer />

    <v-row class="position-relative my-2 mx-15 px-15">
        <v-col md="7">
            <v-card class="" variant="text" width="800" min-height="500">

                <div class="d-flex flex-column">

                    <v-card width="800" height="40" rounded="b-0" variant="flat">
                        <v-card-text class="d-flex align-center">
                            <v-checkbox class="my-n6 text-button" :ripple="false">
                                <template #label>
                                    <span class="text-caption text-uppercase">Select all</span>
                                </template>
                            </v-checkbox>
                        </v-card-text>
                    </v-card>

                    <v-card v-for="(store, s) in Header.carts.store" :key="s" width="800" class="my-2" :rounded="false"
                        variant="flat">

                        <v-list-item-title class="mx-4 my-1 d-flex flex-row align-center">
                            <v-checkbox class="text-button mt-n2 mb-n8" :ripple="false" />
                            <a href="/profile" class="align-center d-flex flex-row">
                                <span class="text-subtitle-2 text-black">{{ store }}</span>
                                <svg-icon class="text-grey-darken-1" type="mdi" :path="mdiChevronRight"
                                    size="25"></svg-icon>
                            </a>
                        </v-list-item-title>
                        <v-divider />

                        <v-list-item-title class="mx-4 my-10 d-flex flex-row align-center"
                            v-for="(item, i) in Header.carts.product" :key="i">

                            <v-row class="align-start">

                                <v-col cols="1" class="mr-n5">
                                    <v-checkbox class="text-button mb-n6" :ripple="false" />
                                </v-col>

                                <v-col cols="2" @click.prevent="toggle(i)">
                                    <v-img :src="product.images[i]" height="90" width="90" aspect-ratio="1/1" cover />
                                </v-col>

                                <v-col cols="4" class="">
                                    <div class="mx-n8 d-flex flex-column">
                                        <button @click.prevent="toggle(i)" variant="text">
                                            <p class="text-subtitle-1 text-wrap text-left text-black"
                                                style="line-height: 1;">{{
                                                    item
                                                }}</p>
                                        </button>


                                        <p class="text-caption text-grey-darken-1">3 stocks left</p>

                                    </div>
                                </v-col>

                                <v-col cols="2" class="mx-5">
                                    <v-card-text v-if="Number(product.discount[i]) > 0"
                                        class="mb-n9 text-red text-subtitle-1 text-uppercase">PHP
                                        {{ product.finalPrice[i] }}</v-card-text>

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
                                        <v-text-field density="compact" variant="underlined" min="0" type="number"
                                            :autofocus="false"></v-text-field>
                                    </v-card>

                                </v-col>

                            </v-row>

                        </v-list-item-title>
                    </v-card>
                </div>
            </v-card>
        </v-col>

        <v-col cols="4" class="d-flex flex-column position-fixed" style="right: 3%;">
            <v-card class="border-sm" width="400" height="200" rounded="b-0" variant="flat"
                style="border-color: green !important;">
                <v-card-text class="text-uppercase border-b-sm" style="border-color: green !important;">Order
                    Summary</v-card-text>

                <v-row>
                    <v-col cols="8">
                        <v-list-item
                            v-for="(list, l) in [`Subtotal (${product.names.length} of items): `, 'Shipping Fee: ', 'Total: ']"
                            :key="l" :title="list" class="text-left" />
                    </v-col>
                    <v-col>
                        <v-list-item v-for="(items, i) in [800, 200, 1000]" :key="i" :title="`PHP ${items}`"
                            class="text-right" />
                    </v-col>
                </v-row>
            </v-card>
            <v-btn class="border-sm" rounded="t-0" width="400" variant="flat"
                :text="`Check out (${product.names.length}) Products`" color="yellow" />
        </v-col>
    </v-row>

    <!-- Product dialog card component -->
    <ProductView :product="product" :index="i" :model="dialog.dialog" :profile="Header.menu.profilePic" />
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