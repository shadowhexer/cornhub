<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHeart, mdiHeartOutline, mdiStoreOutline, mdiForum } from '@mdi/js';

const props = defineProps<{
    product: {
        names: string[],
        images: string[],
        store: string[],
        price: Number[],
        discount: Number[],
        finalPrice: Number[],
        bookmarked: boolean[],
        category: string[],
        dateAdded: number[],
        description: string[],
        link: string[],
    },
    index: number,
    model: boolean[],
    basket: any,
    exist: boolean[],
    profile: string,
}>();

</script>

<template>
    <v-dialog v-model="model[index]">
        <v-card min-height="500" width="700" class="d-flex flex-column align-center" location="top center">

            <div class="d-flex flex-row justify-space-between ma-3 ">

                <v-card class="custom-card ma-5" variant="outlined" width="250" height="350">
                    <v-img :src="product.images[index]" width="250" height="350" cover>

                        <div v-if="Number(product.discount[index]) > 0">
                            <v-spacer style="height: 20rem !important;" />

                            <v-card class="d-flex flex-row justify-center" width="350" height="40"
                                location="right center" variant="flat" :rounded="false" color="yellow">

                                <div class="d-flex flex-column justify-center">
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
                    <v-card width="350" max-height="100" variant="text">
                        <v-card-text class="text-h5 mx-n4">{{ product.names[index] }}</v-card-text>
                    </v-card>

                    <div class="d-flex flex-row">
                        <v-card class="d-flex flex-row mx-n4" width="350" height="50" variant="text">

                            <div class="d-flex flex-column justify-center">
                                <v-card-text v-if="Number(product.discount[index]) > 0"
                                    class="mb-n9 text-red-darken-2 font-weight-bold">PHP
                                    {{ product.finalPrice[index] }}</v-card-text>

                                <v-card-text class="my-auto">
                                    <span
                                        :class="Number(product.discount[index]) > 0 ? 'line-through text-grey-darken-1' : ''"
                                        class=" font-weight-bold">
                                        PHP {{ product.price[index] }}
                                    </span>
                                </v-card-text>
                            </div>

                            <v-card-text
                                v-if="Number(product.discount[index]) > 0 && (product.discount[index] as number) != (product.price[index] as number)"
                                class="text-black"> {{ product.discount[index] }}% off</v-card-text>
                        </v-card>

                        <v-chip v-if="product.category[index]" class="mx-n15 text-caption" color="yellow"
                            variant="flat">{{ product.category[index] }}</v-chip>
                    </div>



                    <v-divider opacity="0.3" class="mx-1" style="width: 23rem !important;" />

                    <v-card width="400" height="80" variant="text" class="d-flex flex-column">
                        <span class="text-caption">Sold by</span>

                        <div class="d-flex flex-row align-center">
                            <v-avatar size="40">
                                <v-img :src="profile" />
                            </v-avatar>

                            <div class="d-flex flex-column mt-n3 mr-12">

                                <v-card-text class="text-subtitle-1 font-weight-medium ml-n2">
                                    {{ product.store[index] }}</v-card-text>

                                <button class="d-flex flex-row mx-2 mt-n5 text-primary"
                                    @click="model[index] = !model[index]">
                                    <svg-icon type="mdi" :path="mdiForum" size="20" />
                                    <span class="text-subtitle-2 mx-1 font-weight-medium">Message</span>
                                </button>
                            </div>

                            <v-btn class="text-right ml-10" width="100" :ripple="false" variant="flat" color="primary"
                                href="/profile">
                                <svg-icon type="mdi" :path="mdiStoreOutline" />
                                <span class="text-caption">Visit Shop</span>
                            </v-btn>

                        </div>


                    </v-card>

                    <v-divider opacity="0.3" class="mx-1" style="width: 23rem !important;" />

                    <div class="d-flex flex-row justify-space-between mx-n3 ">

                        <v-card width="150" height="50" variant="text">
                            <v-card-text class="text-subtitle-2 text-grey">Date added: {{ product.dateAdded[index]
                                }}</v-card-text>
                        </v-card>

                        <v-card width="150" height="50" variant="text">
                            <v-card-text class="text-subtitle-2 text-grey">Stocks: 100</v-card-text>
                        </v-card>


                        <v-card width="100" height="50" variant="text" class="d-flex flex-row align-center">

                            <v-btn icon variant="text" size="30"
                                @click.prevent="product.bookmarked[index] = !product.bookmarked[index]" :ripple="false">
                                <svg-icon size="20" type="mdi"
                                    :path="product.bookmarked[index] == false ? mdiHeartOutline : mdiHeart" />
                            </v-btn>
                            <span class="text-subtitle-2">{{ index }}</span>

                        </v-card>
                    </div>

                    <v-card width="200" height="50" class="d-flex flex-row mx-n3" variant="text">
                        <v-card-text class="text-subtitle-2">Quantity: </v-card-text>
                        <v-text-field density="compact" variant="underlined" min="0" type="number"
                            :autofocus="false"></v-text-field>
                    </v-card>

                    <div class="d-flex flex-row justify-space-evenly ml-n5 text-center">
                        <v-btn v-if="!exist[index]" width="150" height="50" variant="flat" base-color="yellow"
                            @click.prevent="basket(index)" :ripple="false">
                            <v-card-text class="text-caption text-uppercase">Add to Basket</v-card-text>
                        </v-btn>

                        <v-btn v-else class="text-caption text-uppercase" text="Added to Basket" width="150" height="50"
                            variant="outlined" base-color="yellow" :ripple="false" @click.prevent />


                        <v-btn width="150" height="50" class="d-flex flex-row" variant="flat" base-color="success"
                            :ripple="false">
                            <v-card-text class="text-caption text-uppercase mr-n6">Buy for </v-card-text>

                            <div class="d-flex flex-column justify-center">
                                <v-card-text v-if="Number(product.discount[index]) > 0"
                                    class="mb-n9 text-white text-caption text-uppercase">PHP
                                    {{ product.finalPrice[index] }}</v-card-text>

                                <v-card-text>
                                    <span :class="Number(product.discount[index]) > 0 ? 'line-through' : ''"
                                        class="text-white text-caption text-uppercase font-weight-bold">
                                        PHP {{ product.price[index] }}
                                    </span>
                                </v-card-text>
                            </div>

                        </v-btn>
                    </div>
                </div>

            </div>

            <div class="d-flex flex-row">
                <v-card class="my-5 pa-1" variant="elevated" width="650" :elevation="2" min-height="200">
                    <v-card-text>Description</v-card-text>
                    <v-divider class="mx-4" opacity="0.3" />
                    <v-card-text v-if="product.description[index]">{{ product.description[index] }}</v-card-text>
                    <v-card-text v-else>LALAL.AI Christmas Sale: Save 50% This Holiday Season!
                        Jingle all the way to savings
                        The holiday season is upon us, and LALAL.AI is here to make your Christmas merry and bright!
                        From December 17 to December 31, 2024, we offer an exclusive Jingle Bell Pack that will fill
                        your audio projects with festive cheer.
                        What's in the Jingle Bell Pack?
                        700 minutes of audio processing for just $40!
                        That's a whopping 50% off our regular price.
                        This amount of minute credits is enough for you to create your own karaoke versions of favorite
                        Christmas holiday hits, extract up to 10 different stems, remove noise from recordings, and then
                        some!
                        Don't miss out on this opportunity.
                        Secure your Jingle Bell Pack before it melts away on December 31!</v-card-text>
                </v-card>
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

::v-deep(.v-overlay__content) {
    width: 0 !important;
    margin: 0 !important;
}
</style>