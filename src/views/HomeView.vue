<script setup lang="ts">
import NavDrawer from '@/components/NavDrawer.vue';
import Main from '@/components/Main.vue';

</script>

<template>
  <NavDrawer />

  <v-spacer />

    <v-layout min-height="1000">
      <Main />
    </v-layout>


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
