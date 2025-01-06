<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
import { RouterView, useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <v-responsive>
    <v-app>
      <div v-if="route.name !== 'login'">
        <Header />
      </div>

      <div class="bg" :class="route.name !== 'login' ? 'mt-5 mb-n15 pb-15' : ''">
        <v-main >
          <RouterView />
        </v-main>
      </div>

      <div v-if="route.name !== 'login'">
        
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