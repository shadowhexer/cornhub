<script setup lang="ts">
import { reactive } from 'vue';

const items = reactive({
    icon: ['mdi-folder', 'mdi-account-multiple', 'mdi-star'],
    title: ['Home', 'Store', 'Videos'],
    value: ['myfiles', 'shared', 'starred'],
    link: ['/', '/products', '']
});

</script>

<template>
    <v-card variant="flat" class="custom-card">
        <v-navigation-drawer location="left" width="225" fixed permanent>
            <v-list class="my-10" nav>
                <v-list-item v-for="(i, index) in items.title" :key="index" :prepend-icon="items.icon[index]"
                    :value="items.value[index]" :href="items.link[index]">
                    <p class="text-subtitle-2 font-weight-bold">{{ i }}</p>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>

</template>