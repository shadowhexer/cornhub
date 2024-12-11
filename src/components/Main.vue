<script setup lang="ts">
import { reactive } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRightCircle } from '@mdi/js';
import Products from './Scripts/Products';
import VSheets from './VSheets.vue';

const carousel = reactive({
    images: [
        'https://project-imas.wiki/images/d/de/Arisu_SS_SSR.png',
        'https://project-imas.wiki/images/0/01/Haru_SS_SSR2%2B.png',
        'https://project-imas.wiki/images/d/df/Miria_SS_SSR5.png',
        'https://project-imas.wiki/images/0/0d/Nina_SS_SSR6.png',
    ]
});

const stores = reactive({
    names: [
        'Arisu',
        'Haru',
        'Chelsea',
    ],
    images: [
        'https://project-imas.wiki/images/5/53/Arisu_SR16.jpg',
        'https://project-imas.wiki/images/1/12/Haru_SS_SSR%2B.png',
        'https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/459456357_1967072953794201_5954716566750958856_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHsfKf5kt8HpTeryxI1xAZCxX1yQWgCew_FfXJBaAJ7D7iaoVDs2-F-IV7WQR93hxVvyM7Zv_IxBuudQujVLKh3&_nc_ohc=a8j6y_OYNlAQ7kNvgEuZ9dA&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=AuXzedLurj8n-Tm8KaY40Uh&oh=00_AYBnoo_ql9lInCVhwOiEfz7meCLX2yE9oxD2wmsiawv_Iw&oe=6752E27D',
    ],
});

</script>

<template>
    <v-main class="d-flex flex-column ma-4 pa-3" width="1000">

        <v-carousel show-arrows="hover" height="250" class="carousel" @contextmenu.prevent hide-delimiters cycle>
            <v-carousel-item v-for="(image, index) in carousel.images" :key="index" :src="image" draggable="false"
                cover />
        </v-carousel>

        <v-divider class="my-10 mx-10" opacity="0.3" inset />

        <v-card variant="flat" height="65">
            <v-list class="d-flex flex-row justify-space-between align-center">
                <v-list-item>
                    <p class="text-h5 text-uppercase font-weight-bold my-1">Huge Discounts!</p>
                </v-list-item>

                <v-list-item>
                    <a href="/products" class="d-flex align-center">
                        <span class="text-subtitle-2 text-right">See all</span>
                        <svg-icon class="mx-2" size="20" type="mdi" href="/" :path="mdiChevronRightCircle" />
                    </a>
                </v-list-item>

            </v-list>

        </v-card>

        <VSheets :items="Products.products" :custom-class="'mx-3'" />

        <v-divider class="my-10 mx-10" opacity="0.3" inset />

        <v-card variant="flat" height="65">
            <v-list class="d-flex flex-row justify-space-between align-center">
                <v-list-item>
                    <p class="text-h5 text-uppercase font-weight-bold my-1">Featured Videos!</p>
                </v-list-item>

                <v-list-item>
                    <a href="/" class="d-flex align-center">
                        <span class="text-subtitle-2 text-right">See all</span>
                        <svg-icon class="mx-2" size="20" type="mdi" href="/" :path="mdiChevronRightCircle" />
                    </a>
                </v-list-item>

            </v-list>

        </v-card>

        <VSheets :items="Products.products" :custom-class="'mx-3'" />

        <v-divider class="my-10 mx-10" opacity="0.3" inset />

        <!-- <VSheets :stores="stores" :header="{title: 'Featured Stores', link: '/store'}" :customClass="'border-sm border-opacity-25'">
            <template #default="{ item, index }">
                <v-avatar class="mx-auto my-5" size="170">
                    <v-img :src="stores.images[index]" draggable="false" cover />
                </v-avatar>
                <v-divider class="my-2 mx-5" opacity="0.3" />
                <p class="text-subtitle-1 font-weight-bold">{{ item }}</p>
            </template>
</VSheets> -->

    </v-main>
</template>