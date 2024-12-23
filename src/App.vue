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
    <v-app>
      <div>
        <Header />
      </div>

      <div class="bg mt-5 mb-n15 pb-15">
        <v-main >
          <RouterView />
        </v-main>
      </div>

      <div class="">
        
          <Footer />
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

.bg {
  background-image: var(--app-background);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

a:hover {
  background-color: transparent;
}
</style>