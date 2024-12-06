<script setup lang="ts">
import { onMounted, ref } from 'vue';

const profile = ref<string>('Hexer')

onMounted(() => {
    document.title = profile.value + ' - Profile';
});
    
</script>

<template>
    <v-card variant="flat">
        <v-card-text>This is my Profile</v-card-text>
    </v-card>
    
</template>