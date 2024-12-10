<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router'
import { onMounted, ref, type Ref } from 'vue';
</script>

<script lang="ts">
export default {
}
</script>

<template>
  <v-responsive>
    <v-app full-height>
      <div>
        <Header />
      </div>

      <div class="mt-5 mb-n15 pb-15">
        <v-main>
          <RouterView />
        </v-main>
      </div>

      <div class="position-static d-flex flex-wrap justify-end flex-end">
        <v-footer class="bg-grey-lighten-1">
          <Footer />
        </v-footer>
      </div>
    </v-app>
  </v-responsive>
</template>
<style>
* {
  font-family: Arial !important;
  font-optical-sizing: auto;
  font-weight: 400;
}

a:hover {
  background-color: transparent;
}
</style>