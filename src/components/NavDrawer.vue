<script setup lang="ts">
import { reactive } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon'; // create types folder under src and declare it on module.d.ts 
import { mdiHomeAccount, mdiStorefront, mdiVideo, mdiAccountQuestion, mdiInformation } from '@mdi/js';

const items = reactive({
    icon: [mdiHomeAccount, mdiStorefront, mdiVideo, mdiAccountQuestion, mdiInformation],
    title: ['Home', 'Store', 'Videos', 'FAQ', 'About us'],
    value: ['myfiles', 'shared', 'starred', 'about'],
    link: ['/', '/products', '/', '/', '/']
});

</script>

<template>
    <v-card variant="flat">
        <v-navigation-drawer location="left" width="220" fixed permanent>
            <v-list class="my-10" nav>
                <v-list-item v-for="(i, index) in items.title" :key="index" :value="items.value[index]"
                    :href="items.link[index]">
                    <template #prepend>
                        <svg-icon class="mx-5" type="mdi" :path="items.icon[index]" />
                    </template>
                    <template #title>
                        <span class="text-subtitle-1 font-weight-bold">{{ i }}</span>
                    </template>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>

</template>