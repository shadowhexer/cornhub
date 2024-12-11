<script setup lang="ts">
import Header from './Scripts/Header';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import { computed, ref } from 'vue';

const props = defineProps<{
    items: {
        names: string[],
        images: string[],
        store: string[],
        price: Number[],
        discount_price: Number[],
        bookmarked: boolean[],
        link: string[],
    },
    customClass?: string,
}>();

const addToBasket = (index: number) => {
    Header.carts.images.push(props.items.images[index]);
    Header.carts.product.push(props.items.names[index]);
    Header.carts.store.push(props.items.store[index]);
    Header.carts.price.push(
        props.items.discount_price[index] == 0 
        ? props.items.price[index].valueOf() 
        : props.items.discount_price[index].valueOf()
    );
    Header.carts.link.push(props.items.link[index]);
    
};

const itemExists = computed(() => {
        return props.items.names.map((item, index) => {
            return Header.carts.product.some (
                (product, i) => 
                product === item && 
                Header.carts.store[i] === props.items.store[index]
            )
        });
    });
</script>

<template>
    <div>
        <v-container>
            <v-row justify="start">
                <v-col v-for="(name, i) in items.names" :key="i" :class="customClass" cols="12" md="2">
                    <v-card class="mx-auto d-flex flex-column" justify="center" height="350"
                        width="200" href="/" hover>

                        <v-img :src="items.images[i]" aspect-ratio="5/7" height="200" width="200" cover />

                        <v-card-actions class="mx-n2 mb-n5">
                            <v-card-text class=" font-weight-bold d-block text-truncate">{{ name }} Corn</v-card-text>
                            <v-btn icon @click.prevent="items.bookmarked[i] = !items.bookmarked[i]"><svg-icon type="mdi" :path="items.bookmarked[i] == false ? mdiHeartOutline : mdiHeart" /></v-btn>
                        </v-card-actions>

                        <v-card-text class="d-block text-truncate text-caption my-n5">{{ items.store[i] }}</v-card-text>


                        <v-card-text v-if="items.discount_price[i]" class="mb-n10 text-red-darken-2 font-weight-bold">PHP {{
                            items.discount_price[i] }}</v-card-text>

                        <v-card-text class="my-auto">
                            <span :class="items.discount_price[i] ? 'line-through text-grey-darken-1' : ''" class="font-weight-bold">
                                PHP {{ items.price[i] }}
                            </span>

                            <span v-if="items.discount_price[i]" class="mx-4 text-black">{{ Math.round((Number(items.price[i]) -
                                Number(items.discount_price[i])) /
                                (items.price[i] as number) * 100)}}% off</span>

                        </v-card-text>

                        <v-btn v-if="!itemExists[i]" text="Add to Basket" variant="flat" base-color="green" rounded="0" @click.prevent="addToBasket(i)" flat block />
                        <v-btn v-else text="Added to Basket" variant="outlined" base-color="green" rounded="0" @click.prevent flat block />
                    </v-card>
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
</style>