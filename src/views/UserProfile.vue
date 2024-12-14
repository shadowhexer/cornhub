<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import md5 from 'md5';
import { sha256 } from '@noble/hashes/sha256';
import axios from 'axios';
import cover from '@/assets/cover.jpg'

const profile = ref<string>('Hexer')
const email = ref('austinmanlangit@gmail.com');
const retrieve = ref([]);

onMounted(() => {
    document.title = profile.value + ' - Profile';
});



const getGravatarUrl = (email: string, size: number = 200): string => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
};

const gravatarUrl = computed(() => getGravatarUrl(email.value, 300));

</script>

<template>
    <v-main class="d-flex flex-column justify-center mx-16 pa-16">
        <v-card class="d-flex flex-column" flat min-height="500">
            <v-img :src="cover" class="" height="300" cover aspect-ratio="16/9" />

            <div class="d-flex flex-row justify-space-between">
                <v-avatar size="200" class="mt-n16 ml-16 mr-n16">
                    <v-img rounded="circle" class="" aspect-ratio="1/1" width="100" :src="gravatarUrl" cover></v-img>
                </v-avatar>
                <v-card-text class="mx-16 pa-12 text-h5 font-weight-bold d-flex flex-column">
                    Hexer
                    <span class="text-subtitle-1">admin</span>
                </v-card-text>
            </div>

        </v-card>
    </v-main>




</template>