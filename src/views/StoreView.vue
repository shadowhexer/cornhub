<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'; // create types folder under src and declare it on module.d.ts 
import { mdiMagnify, mdiChevronUp, mdiChevronDown } from '@mdi/js';
import NavDrawer from '@/components/NavDrawer.vue';
import VSheets from '@/components/VSheets.vue';
import Products from '@/components/Scripts/Products';
import { ref } from 'vue';

const isExpanded = ref([false, false, false])
</script>

<template>

    <NavDrawer />
    <v-spacer />

    <div class="position-relative custom-card">


        <div class="position-relative">
            <v-card variant="flat" class="custom-card">
                <v-layout min-height="3000">

                    <v-card class=" mt-15 mb-15 custom-card" width="350">
                        <v-card elevation="4" class="bottom-0 mx-auto" position="sticky" location="left bottom"
                            width="250" height="90">
                            <v-card-text class="my-auto">
                                <v-text-field density="compact" placeholder="Search product..." variant="outlined"
                                    bg-color="white" flat hide-details single-line>
                                    <template v-slot:prepend-inner>
                                        <svg-icon type="mdi" :path="mdiMagnify" />
                                    </template>
                                </v-text-field>
                            </v-card-text>
                        </v-card>

                        <v-card elevation="5" class="mx-auto my-10" width="250"
                            v-for="(item, i) in ['Categories', 'Price', 'Rating']" :key="i">
                            <v-card-text>

                                <div type="button" class="d-flex justify-space-between align-center"
                                    @click.prevent="isExpanded[i] = !isExpanded[i]" :aria-expanded="isExpanded[i]"
                                    :aria-label="isExpanded[i] ? 'Collapse' : 'Expand'">

                                    <span class="font-weight-bold">{{ item }}</span>
                                    <svg-icon type="mdi" :path="isExpanded[i] ? mdiChevronUp : mdiChevronDown" />
                                </div>

                            </v-card-text>

                            <v-expand-transition>
                                <div v-show="isExpanded[i]">
                                    <v-divider />
                                    <v-list >
                                        <v-list-item v-for="(item, index) in ['Item 1', 'Item 2', 'Item 3']"
                                            :key="index"
                                            :class="{'last-sticky' : index === item.length - 1}">
                                            <v-list-item-title>{{ item }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-expand-transition>
                        </v-card>

                    </v-card>

                    <v-main class="d-flex flex-column my-5" width="1000">
                        <VSheets :items="Products.products" :custom-class="'mx-3'" />
                    </v-main>

                </v-layout>
            </v-card>


        </div>
    </div>
    <v-spacer />

</template>

<style scoped>
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

.last-sticky {
    position: sticky !important;
    top: 0 !important;
    
}
</style>