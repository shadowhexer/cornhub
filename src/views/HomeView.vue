<script setup lang="ts">

</script>

<template>
  <v-card variant="flat" class="custom-card">
    <v-layout>

      <v-navigation-drawer class="" location="left" absolute>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-spacer />

      <v-main class=" d-flex flex-column">
        <v-carousel show-arrows="hover" hide-delimiter-background cycle class="border-b-xl border-opacity-0">
          <v-carousel-item src="https://pbs.twimg.com/media/Fz3IKCDakAcjjPq?format=jpg&name=4096x4096" height="500"
            width="2000" cover></v-carousel-item>

          <v-carousel-item src="https://pbs.twimg.com/media/Fz3IKCDakAcjjPq?format=jpg&name=4096x4096" height="500"
            width="2000" cover></v-carousel-item>

          <v-carousel-item src="https://pbs.twimg.com/media/Fz3IKCDakAcjjPq?format=jpg&name=4096x4096" height="500"
            width="2000" cover></v-carousel-item>
        </v-carousel>

        <v-list density="compact" variant="flat" class="custom-card">
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-main>

    </v-layout>


  </v-card>


</template>
<style scoped>
.custom-card {
  background-color: transparent !important; /* Ensures no background */
  box-shadow: none !important; /* Removes any shadow, if any */
}

.custom-card:hover {
  background-color: transparent !important; /* Prevents hover effect */
}
</style>