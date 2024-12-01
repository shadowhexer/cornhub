<script setup lang="ts">

</script>

<template>
  <v-card variant="flat" class="custom-card">
    <v-layout>

      <v-navigation-drawer class="" location="left" absolute width="225">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-spacer />

      <v-main class="d-flex flex-column ma-3 pa-2" width="1000">

        <v-carousel show-arrows="hover" height="200" class="carousel" hide-delimiters cycle>
          <v-carousel-item src="https://pbs.twimg.com/media/Fz3IKCDakAcjjPq?format=jpg&name=4096x4096"
            cover></v-carousel-item>

          <v-carousel-item src="https://pbs.twimg.com/media/Fz3IKCDakAcjjPq?format=jpg&name=4096x4096"
            cover></v-carousel-item>

          <v-carousel-item src="https://pbs.twimg.com/media/Fz3IKCDakAcjjPq?format=jpg&name=4096x4096"
            cover></v-carousel-item>
        </v-carousel>

        <v-divider class="my-10 mx-10" opacity="0.3" inset />


        <p class="text-h5 font-weight-bold">Featured Products</p>

        <v-container>
          <v-row justify="start">
            <v-col 
            v-for="i in 15"
            :key="i"
            cols="12" 
            md="4">
              <v-sheet class="mx-auto text-center" justify="center" height="300" width="300">
                Yellow Corn
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>


        <!-- <v-list density="compact" variant="flat">
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>

        <v-list density="compact" class="">
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list> -->
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
