<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';

const props = defineProps<{
    product: {
        names: string[],
        images: string[],
        store: string[],
        price: Number[],
        discount: Number[],
        finalPrice: Number[],
        bookmarked: boolean[],
        dateAdded: number[],
        description: string[],
        link: string[],
    },
    index: number,
    model: boolean[],
    basket: any,
    exist: boolean[],
}>();

</script>

<template>
    <v-dialog v-model="model[index]">
        <v-card min-height="500" width="900" location="top center">
            <div class="d-flex flex-column align-center">
                <div class="d-flex flex-row justify-center">

                    <v-card class="custom-card ma-5" variant="outlined" width="350" height="400">
                        <v-img :src="product.images[index]" width="350" height="400" cover>
                            <div v-if="Number(product.discount[index]) > 0">
                                <v-spacer style="height: 22rem !important;"></v-spacer>

                                <v-card class="d-flex flex-row justify-center" width="450" height="50"
                                    location="right center" variant="flat" :rounded="false" color="yellow">

                                    <div class="d-flex flex-column justify-center ml-15">
                                        <v-card-text v-if="Number(product.discount[index]) > 0"
                                            class="mb-n9 text-red-darken-2 font-weight-bold">PHP
                                            {{ product.finalPrice[index] }}</v-card-text>

                                        <v-card-text class="my-auto">
                                            <span class="line-through text-grey-darken-1 font-weight-bold">
                                                PHP {{ product.price[index] }}
                                            </span>
                                        </v-card-text>
                                    </div>

                                    <v-card-text
                                        v-if="Number(product.discount[index]) > 0 && (product.discount[index] as number) != (product.price[index] as number)"
                                        class="text-black"> {{ product.discount[index] }}% off</v-card-text>
                                </v-card>
                            </div>

                        </v-img>

                    </v-card>

                    <div class="d-flex flex-column my-5 justify-space-between">
                        <v-card width="450" height="100" variant="tonal">
                            <v-card-text class="text-h5 font-weight-bold">{{ product.names[index] }}</v-card-text>
                        </v-card>
                        <v-card width="450" height="50" variant="tonal">
                            <v-card-text class="text-subtitle-1">PHP {{ product.price[index] }}</v-card-text>
                        </v-card>
                        <v-card width="450" height="50" variant="tonal">
                            <v-card-text class="text-subtitle-1">{{ product.store[index] }}</v-card-text>
                        </v-card>
                        <v-card width="450" height="50" variant="tonal">
                            <v-card-text class="text-subtitle-1">Date added: {{ product.dateAdded[index]
                                }}</v-card-text>
                        </v-card>

                        <div class="d-flex flex-row justify-space-between">
                            <v-card width="150" height="50" variant="text">
                                <v-card-text class="text-subtitle-1">Stocks: 100</v-card-text>
                            </v-card>

                            <v-card width="150" height="50" variant="text">
                                <v-card-text class="text-subtitle-1">Quantity: </v-card-text>
                            </v-card>

                            <v-card width="150" height="50" variant="text" class="d-flex flex-row align-center">

                                <v-btn icon variant="text" @click.prevent="product.bookmarked[index] = !product.bookmarked[index]">
                                    <svg-icon type="mdi"
                                        :path="product.bookmarked[index] == false ? mdiHeartOutline : mdiHeart" />
                                </v-btn>
                                <span class="text-subtitle-2">{{ index }}</span>

                            </v-card>
                        </div>

                        <div class="d-flex flex-row justify-space-between text-center">
                            <v-btn v-if="!exist[index]" width="200" height="50" variant="flat" base-color="yellow"
                                @click.prevent="basket(index)">
                                <v-card-text class="text-button">Add to Basket</v-card-text>
                            </v-btn>

                            <v-btn v-else text="Added to Basket" width="200" height="50" variant="outlined"
                                base-color="yellow" @click.prevent />


                            <v-btn width="200" height="50" variant="flat" base-color="success">
                                <v-card-text class="text-button">Buy for PHP {{ product.price[index]
                                    }}</v-card-text>
                            </v-btn>
                        </div>
                    </div>

                </div>

                <div class="d-flex flex-row">
                    <v-card class=" ma-5" variant="elevated" width="800" :elevation="2" min-height="200">
                        <v-card-text>Description</v-card-text>
                        <v-divider class="mx-5" opacity="0.3" />
                        <v-card-text>{{ product.description[index] }}</v-card-text>
                    </v-card>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
<style scoped>
.line-through {
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
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

.v-dialog > .v-overlay__content {
    max-height: calc(100% - 48px);
    width: 0px !important;
    max-width: calc(100% - 48px);
    margin: 0px !important;
}
</style>