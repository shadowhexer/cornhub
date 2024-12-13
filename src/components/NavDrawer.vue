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
    <v-navigation-drawer location="top" width="50" sticky permanent>
        <v-card variant="flat" >
            <v-list class="mt-3 mb-n3 d-flex flex-row justify-center" nav>
                <v-list-item v-for="(i, index) in items.title" :key="index" :value="items.value[index]"
                    :href="items.link[index]" :ripple="false" class="mx-8">
                    <template #prepend>
                        <svg-icon class="mr-2" type="mdi" :path="items.icon[index]" />
                    </template>
                    <template #title>
                        <span class="text-subtitle-1 font-weight-bold">{{ i }}</span>
                    </template>
                </v-list-item>
            </v-list>
        </v-card>
    </v-navigation-drawer>


</template>
<style scoped>

</style>