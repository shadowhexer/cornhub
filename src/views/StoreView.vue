<script setup lang="ts">
import NavDrawer from '@/components/NavDrawer.vue';
</script>

<template>
    <NavDrawer />
    <v-spacer />
    <v-card variant="flat" class="custom-card">
        <v-layout min-height="1000">
            <v-main class="d-flex flex-column ma-3 pa-2" width="1000">
            </v-main>
        </v-layout>
    </v-card>

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
</style>