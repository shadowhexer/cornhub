<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    items: {
        header: string,
        btnColor: string,
        icon: string[],
        title: string[],
        subtitle: string[],
        link: string[],
    },
}>();

</script>

<template>
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="elevated" :elevation="0" :color="items.btnColor" size="default">
                <slot :name="'icons'" :icon="'head'" />
            </v-btn>
        </template>

        <v-card min-width="400">

            <v-list class="mx-1">
                <v-list-item>

                    <template #title>
                        <div class="d-flex flex-row justify-space-between align-center pa-0">

                            <div class="d-flex align-center">
                                <slot :name="'icons'" />
                                <span class="mx-1 text-h6 font-weight-bold">{{ items.header }}</span>
                            </div>

                            <div>
                                <slot :name="'mark'" />
                            </div>

                        </div>
                    </template>


                </v-list-item>
            </v-list>

            <v-divider class="mx-7" opacity="0.3" />

            <v-list lines="two" class="mx-1">
                <!-- Show "Empty..." if all products/links are empty -->
                <v-list-item
                    v-if="items.title.length === 0 || items.title.every((item, index) => !item || !items.link[index])"
                    disabled>
                    <v-list-item-title>Empty...</v-list-item-title>
                </v-list-item>

                <!-- Show the valid items -->
                <template v-for="(item, i) in items.title">
                    <v-list-item v-if="items.title[i] && items.subtitle[i]" :key="i" :value="item">

                        <template #prepend>
                            <v-img icon :src="items.icon[i]"></v-img>
                        </template>

                        <template v-slot:title>
                            <span class="font-weight-bold">{{ items.subtitle[i] }}</span>
                        </template>

                        <template v-slot:subtitle>
                            <span>{{ item }}</span>
                        </template>





                    </v-list-item>

                    <v-list-item v-else :href="items.link[i]" :prepend-avatar="items.icon[i]">{{
                        items.title[i] }}</v-list-item>
                </template>
            </v-list>
        </v-card>

    </v-menu>
</template>
