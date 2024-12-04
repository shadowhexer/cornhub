<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRightCircle } from '@mdi/js';

defineProps<{
    items: {
        names: string[],
        images: string[],
    },
    header: {
        title: string,
        link: string,
    }
    customClass?: string,
}>();

</script>

<template>
    <div>
        <v-card variant="flat" height="65">

            <v-list class="d-flex flex-row justify-space-between align-center">

                <v-list-item>
                    <p class="text-h5 text-uppercase font-weight-bold my-1">{{ header.title }}</p>
                </v-list-item>

                <v-list-item>
                    <a :href="header.link" class="d-flex align-center">
                        <span class="text-subtitle-2 text-right">See all</span>
                        <svg-icon class="mx-2" size="20" type="mdi" href="/" :path="mdiChevronRightCircle" />
                    </a>
                </v-list-item>

            </v-list>

        </v-card>

        <v-container>
            <v-row justify="start">
                <v-col v-for="(name, index) in items.names" :key="index" class="mx-3" cols="12" md="2">
                    <v-sheet class="mx-auto text-center d-flex flex-column" :class="customClass" justify="center"
                        height="300" width="200" elevation="0">
                        <slot :item="name" :index="index" />
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>