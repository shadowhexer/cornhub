<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'; // create types folder under src and declare it on module.d.ts 
import { mdiMagnify, mdiChevronUp, mdiChevronDown } from '@mdi/js';
import NavDrawer from '@/components/NavDrawer.vue';
import VSheets from '@/components/VSheets.vue';
import Products from '@/components/Scripts/Products';
import { computed, onMounted, reactive, ref } from 'vue';

const isExpanded = ref([false, false, false]);
// Reactive state for search term
const searchItem = ref('');
const page = ref(1)

const sideBarItems = reactive([
    {
        name: 'Sort By',
        items: ['Alphabetically', 'Highest Discount', 'Most Likes', 'Recently Added']
    },
    {
        name: 'Price Range',
        items: ['Min Price', 'Max Price'],
    },
    {
        name: 'Category',
        items: Products.categories.category
    },
]);

onMounted(() => {
    document.title = 'Store';

});

</script>

<template>

    <NavDrawer />
    <v-spacer />

    <div class="position-relative custom-card">


        <div class="position-relative">
            <v-card variant="flat" class="custom-card overflow-hidden">
                <v-layout min-height="500">

                    <v-card class="mt-10 mb-15 custom-card" width="350">
                        <v-card elevation="4" class="mx-auto" location="left bottom" width="270" height="75">
                            <v-card-text class="my-auto">
                                <v-text-field v-model="searchItem" density="compact" placeholder="Search product..."
                                    variant="outlined" bg-color="white" flat hide-details single-line>
                                    <template v-slot:append-inner>
                                        <svg-icon type="mdi" :path="mdiMagnify" />
                                    </template>
                                </v-text-field>
                            </v-card-text>
                        </v-card>

                        <v-spacer style="height: 50px;" />

                        <v-card elevation="5" class="mx-auto my-5" width="270" v-for="(items, i) in sideBarItems"
                            :key="i">
                            <v-card-text>

                                <div type="button" class="d-flex justify-space-between align-center"
                                    @click.prevent="isExpanded[i] = !isExpanded[i]" :aria-expanded="isExpanded[i]"
                                    :aria-label="isExpanded[i] ? 'Collapse' : 'Expand'">

                                    <span class="font-weight-bold">{{ items.name }}</span>
                                    <svg-icon type="mdi" :path="isExpanded[i] ? mdiChevronUp : mdiChevronDown" />
                                </div>

                            </v-card-text>

                            <v-expand-transition>
                                <div v-show="isExpanded[i]">
                                    <v-divider />
                                    <v-list nav>

                                        <v-radio-group v-model="searchItem" v-if="items.name === 'Sort By'">
                                            <v-radio v-for="(item, index) in items.items" :key="index"
                                                :class="{ '': index === item.length - 1 }" :value="item">
                                                <template #label>
                                                    <span class="text-subtitle-2 font-weight-bold">{{ item }}</span>
                                                </template>
                                            </v-radio>
                                        </v-radio-group>
                                        <!-- <v-list-item-title>{{ item }}</v-list-item-title> -->

                                        <v-list-item v-else-if="items.name === 'Price Range'"
                                            v-for="(item, i) in items.items" :key="i">
                                            <v-list-item-title class="font-weight-bold">{{ item }}
                                                <v-text-field density="compact" />
                                            </v-list-item-title>
                                        </v-list-item>

                                        <v-checkbox v-else-if="items.name === 'Category'"
                                            v-for="(item, index) in items.items" :key="index" class="" hide-details>
                                            <template #label>
                                                <span class="text-subtitle-2 font-weight-bold">{{ item }}</span>
                                            </template>
                                        </v-checkbox>

                                    </v-list>
                                </div>
                            </v-expand-transition>
                        </v-card>

                    </v-card>

                    <v-main class="d-flex flex-column my-5" width="1000">
                        <VSheets :items="Products.products" :search-item="searchItem" :custom-class="'mx-3'" />
                        <v-pagination v-model="page" length="1" rounded="circle" />
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

::v-deep(.v-label) {
    opacity: 1 !important;
}
</style>