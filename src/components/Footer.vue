<script lang="ts">
    export default {
        name: "Footer",
    }
</script>

<template>
    <div location="bottom" width="1000" absolute>
      <v-footer class="bg-grey-lighten-1">
      <v-row justify="center" no-gutters>
          <v-col class="text-center mt-4" cols="12">
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
          </v-col>
        </v-row>
      </v-footer>
    </div>
        
      
</template>
<style scoped>
div {
  height: 50px;
}
</style>