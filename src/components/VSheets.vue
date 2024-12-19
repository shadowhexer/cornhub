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
        discount: Number[],
        finalPrice: Number[],
        bookmarked: boolean[],
        link: string[],
    },
    customClass?: string,
    searchItem: string,
}>();

// Filter items based on search query
const filteredItems = computed(() => {

    const filteredIndices = props.items.names
        .map((name, index) => ({ name, index }))
        .filter(({ name }) => name.toLowerCase().includes(props.searchItem.toLowerCase()))
        .map(({ index }) => index);

    return filteredIndices.map(i => ({
        names: props.items.names[i],
        images: props.items.images[i],
        store: props.items.store[i],
        price: props.items.price[i],
        discount: props.items.discount[i],
        finalPrice: props.items.finalPrice[i],
        bookmarked: props.items.bookmarked[i],
        link: props.items.link[i],
        originalIndex: i, // Include the original index
    }));
});

const addToBasket = (index: number) => {
    Header.carts.images.push(props.items.images[index]);
    Header.carts.product.push(props.items.names[index]);
    Header.carts.store.push(props.items.store[index]);
    Header.carts.price.push(
        props.items.discount[index] == 0
            ? props.items.price[index].valueOf()
            : props.items.discount[index].valueOf()
    );
    Header.carts.link.push(props.items.link[index]);

};

const itemExists = computed(() => {
    return props.items.names.map((item, index) => {
        return Header.carts.product.some(
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
                <v-col v-for="(item, i) in filteredItems" :key="i" :class="customClass" cols="12" md="2">
                    <v-card class="mx-auto d-flex flex-column" justify="center" width="200" href="/" hover>

                        <div style="height: 200px;">
                            <v-img :src="item.images" aspect-ratio="5/7" height="200" width="200" cover />
                        </div>

                        <div style="height: 50px;">
                            <v-card-actions class="mx-n2 mt-n3">
                                <v-card-text class=" truncate overflow-hidden" style="line-height: 1.1;">{{ item.names
                                    }}</v-card-text>
                                <div class="d-flex flex-column align-center">
                                    <slot name="userProfile">
                                        <v-btn icon
                                            @click.prevent="items.bookmarked[item.originalIndex] = !items.bookmarked[item.originalIndex]">
                                            <svg-icon type="mdi"
                                                :path="items.bookmarked[item.originalIndex] == false ? mdiHeartOutline : mdiHeart" />

                                        </v-btn>
                                        <span class="mt-n3" style="font-size: 0.55rem;">{{ i }}</span>
                                    </slot>

                                </div>
                            </v-card-actions>
                        </div>

                        <!-- <div style="height: 10px;">
                            <v-card-text class="truncate overflow-hidden text-caption my-n5">{{ item.store
                                }}</v-card-text>
                        </div> -->

                        <div style="height: 60px;">
                            <v-card-text v-if="Number(item.discount) > 0" class="mb-n9 text-red-darken-2 font-weight-bold">PHP
                                {{ item.finalPrice }}</v-card-text>

                            <v-card-text class="my-auto">
                                <span :class="item.discount ? 'line-through text-grey-darken-1' : ''"
                                    class="font-weight-bold">
                                    PHP {{ item.price }}
                                </span>

                                <span v-if="Number(item.discount) > 0 && (item.discount as number) != (item.price as number)" class="mx-4 text-black">{{ item.discount }}% off</span>
                                

                            </v-card-text>
                        </div>

                        <div>
                            <slot name="edit" :index="i">
                                <v-btn v-if="!itemExists[i]" text="Add to Basket" variant="flat" base-color="green"
                                    rounded="0" @click.prevent="addToBasket(i)" flat block />
                                <v-btn v-else text="Added to Basket" variant="outlined" base-color="green" rounded="0"
                                    @click.prevent flat block />
                            </slot>
                        </div>

                        <slot name="dialog" :index="i" />
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

.truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    /* Change this to the desired number of lines */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
</style>