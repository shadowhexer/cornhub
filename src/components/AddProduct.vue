<script setup lang="ts">
import { reactive, ref } from 'vue';
import AddDialog from './AddDialog.vue';
import UserForms from './Scripts/UserProfile';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPencil, mdiPlus } from '@mdi/js';

const products = UserForms.Products;
const profile = UserForms.profile;
const dialog = reactive<{ dialog: boolean }>({ dialog: false });
const toggle = () => {
        dialog.dialog = !dialog.dialog;
    };

const props = defineProps<{
    isLogin: boolean,
}>();

</script>

<template>
    <div class="d-flex flex-column">
        <v-card v-if="isLogin" class="d-flex align-center justify-center mb-2" color="primary" height="40" width="140"
            @click.prevent="toggle" :ripple="false" draggable="false" variant="outlined">
            <svg-icon type="mdi" :path="mdiPlus"></svg-icon>
            <span class="text-subtitle-1 mx-1">Add Product</span>
        </v-card>

        <div>
            <AddDialog :dialog="dialog" :toggle="toggle"
                :categories="products.categories.category" />
        </div>

        <v-card v-if="isLogin" class="d-flex align-center justify-center mt-2" color="primary" height="40" width="140"
            href="/setting" :ripple="false" draggable="false" variant="flat" hover>
            <svg-icon type="mdi" :path="mdiPencil"></svg-icon>
            <span class="text-subtitle-1 mx-1">Edit Profile</span>
        </v-card>
    </div>
</template>