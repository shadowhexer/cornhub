<script setup lang="ts">
import { reactive } from 'vue';

const carousel = reactive({
    images: [
        'https://project-imas.wiki/images/d/de/Arisu_SS_SSR.png',
        'https://project-imas.wiki/images/0/01/Haru_SS_SSR2%2B.png',
        'https://project-imas.wiki/images/d/df/Miria_SS_SSR5.png',
        'https://project-imas.wiki/images/0/0d/Nina_SS_SSR6.png',
    ]
});

const stores = reactive({
    name: [
        'Arisu',
        'Haru',
        'Chelsea',
    ],
    images: [
        'https://project-imas.wiki/images/5/53/Arisu_SR16.jpg',
        'https://project-imas.wiki/images/1/12/Haru_SS_SSR%2B.png',
        'https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/459456357_1967072953794201_5954716566750958856_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHsfKf5kt8HpTeryxI1xAZCxX1yQWgCew_FfXJBaAJ7D7iaoVDs2-F-IV7WQR93hxVvyM7Zv_IxBuudQujVLKh3&_nc_ohc=a8j6y_OYNlAQ7kNvgEuZ9dA&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=AuXzedLurj8n-Tm8KaY40Uh&oh=00_AYBnoo_ql9lInCVhwOiEfz7meCLX2yE9oxD2wmsiawv_Iw&oe=6752E27D',
    ]
});

</script>

<template>
    <v-main class="d-flex flex-column ma-4 pa-3" width="1000">

        <v-carousel show-arrows="hover" height="200" class="carousel" hide-delimiters cycle>
            <v-carousel-item v-for="(image, index) in carousel.images" :key="index" :src="image" cover />
        </v-carousel>

        <v-divider class="my-10 mx-10" opacity="0.3" inset />

        <v-card variant="flat">
            <div>
                <p class="text-h5 font-weight-bold">Featured Products</p>
                <v-container>
                    <v-row justify="start">
                        <v-col v-for="i in 10" :key="i" cols="12" md="3">
                            <v-sheet class="mx-auto text-center d-flex flex-column border-sm border-opacity-50"
                                justify="center" height="300" width="250" elevation="1">
                                <v-sheet class="mx-auto my-5" height="200" width="200">
                                    <v-img
                                        src="https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4">
                                    </v-img>
                                </v-sheet>

                                Yellow Corn
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>
            </div>

        </v-card>

        <v-divider class="my-10 mx-10" opacity="0.3" inset />

        <v-card variant="flat" class="custom-card">
            <div>
                <p class="text-h5 font-weight-bold">Featured Stores</p>
                <v-container>
                    <v-row justify="start">
                        <v-col v-for="(name, index) in stores.name" :key="index" cols="12" md="3">
                            <v-sheet class="mx-auto text-center d-flex flex-column border-sm border-opacity-50"
                                justify="center" height="250" elevation="1" width="200">
                                <v-avatar class="mx-auto my-5" size="150">
                                    <v-img :src="stores.images[index]" cover>
                                    </v-img>
                                </v-avatar>
                                <p class="text-subtitle-1 font-weight-bold">{{ name }}</p>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-card>
    </v-main>
</template>