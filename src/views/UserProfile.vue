<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload, mdiPencil, mdiAccount, mdiMessageProcessing, mdiCalendarAccount, mdiPlus, mdiHeart, mdiClose, mdiDeleteOutline, mdiCheckBold } from '@mdi/js';
import NavDrawer from '@/components/NavDrawer.vue';
import VSheets from '@/components/VSheets.vue';

import UserForms from '@/components/Scripts/UserProfile'
const forms = UserForms.userForms();
const fileSelect = UserForms.fileSelection();
const products = UserForms.Products;
const images = UserForms.profile;

import cover from '@/assets/cover.jpg'
import profilePic from '@/assets/profile.jpg'

const profile = ref<string>('Hexer')
const name = ref<string>('Chairman of the Presidium of the Supreme Soviet')
const userType = ref<string>('Chairman')

onMounted(() => {
    document.title = profile.value + ' - Profile';
});

onMounted(() => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const image = localStorage.getItem(`Image_${i}`);

        if (i === 0 || key as string === image) {
            images.profile.coverPhoto = image as string;
        }
        else if (i === 1 || key as string === image) {
            images.profile.profilePhoto = image as string;
        }

    }
});

</script>

<template>
    <NavDrawer />
    <v-main class="d-flex flex-column justify-center mx-16 pa-16">
        <v-card class="d-flex flex-column" min-height="500">
            <v-hover v-slot="{ isHovering, props }">
                <v-img v-bind="props" :src="images.profile.coverPhoto" height="300" cover aspect-ratio="16/9">
                    <v-overlay :model-value="!!isHovering" class="d-flex flex-row justify-center align-center"
                        @click="fileSelect.triggerFileInput" contained persistent no-click-animation>

                        <v-card class="d-flex align-center custom-card" hover>
                            <svg-icon type="mdi" class="mx-2 text-white" size="30" :path="mdiUpload"></svg-icon>
                            <span class="text-h5 text-white">Upload Cover Photo</span>

                            <input type="file" accept="image/*" :ref="fileSelect.fileInput" class="d-none"
                                @change="fileSelect.uploadProfile($event, 0)" />
                        </v-card>

                    </v-overlay>
                </v-img>
            </v-hover>


            <div class="d-flex flex-row justify-space-between align-center my-n10">
                <v-row class="align-center my-10">
                    <v-col cols="2" md="3">
                        <v-hover v-slot="{ isHovering, props }">
                            <v-avatar v-bind="props" size="200" class="mt-n16 ml-16 border-md border-opacity-100">
                                <v-img rounded="circle" class="" aspect-ratio="1/1" width="100"
                                    :src="images.profile.profilePhoto" cover>
                                    <v-overlay :model-value="!!isHovering"
                                        class="d-flex felx-row justify-center align-center"
                                        @click="fileSelect.triggerFileInput" contained persistent no-click-animation>

                                        <v-card class="d-flex align-center custom-card" hover>
                                            <svg-icon type="mdi" class="mx-1 text-white" size="20"
                                                :path="mdiUpload"></svg-icon>
                                            <span class="text-subtitle-2 text-white">Upload Profile Photo</span>

                                            <input type="file" accept="image/*" :ref="fileSelect.fileInput"
                                                class="d-none" @change="fileSelect.uploadProfile($event, 1)" />
                                        </v-card>
                                    </v-overlay>
                                </v-img>
                            </v-avatar>
                        </v-hover>
                    </v-col>

                    <v-col cols="4" class="flex-grow-0 flex-shrink-1 mx-n3">
                        <div class="custom-card d-flex flex-column align-start ml-n10">
                            <v-card class="custom-card ">
                                <v-card-text class="font-weight-bold text-h4" :class="name.length > 10 ? 'text-h5' : ''"
                                    style="line-height: 1.1;">{{ name }}</v-card-text>
                                <v-card-text class="text-subtitle-1 mt-n8">{{ userType }}</v-card-text>
                            </v-card>
                        </div>
                    </v-col>

                    <v-col cols="3">
                        <div class="custom-card d-flex flex-column align-start">
                            <v-card class="custom-card d-flex align-center">
                                <svg-icon class="text-grey-darken-2" type="mdi" :path="mdiCalendarAccount"
                                    size="20"></svg-icon>
                                <span class="text-subtitle-2 font-weight-bold mx-1 text-grey-darken-2">Join:</span>
                                <span class="text-subtitle-2 mx-1 text-grey-darken-2">15 December 2002</span>
                            </v-card>

                            <v-card class="custom-card d-flex align-center">
                                <svg-icon class="text-grey-darken-2" type="mdi" :path="mdiAccount" size="20"></svg-icon>
                                <span class="text-subtitle-2 font-weight-bold mx-1 text-grey-darken-2">Followers:</span>
                                <span class="text-subtitle-2 mx-1 text-grey-darken-2">200K</span>
                            </v-card>

                            <v-card class="custom-card d-flex align-center">
                                <svg-icon class="text-grey-darken-2" type="mdi" :path="mdiMessageProcessing"
                                    size="20"></svg-icon>
                                <span class="text-subtitle-2 font-weight-bold mx-1 text-grey-darken-2">Response
                                    rate:</span>
                                <span class="text-subtitle-2 mx-1 text-grey-darken-2">85.1%</span>
                            </v-card>
                        </div>
                    </v-col>

                    <v-col cols="1">
                        <div class="d-flex flex-column">
                            <v-card class="d-flex align-center justify-center mb-2" color="primary" height="40"
                                width="140" href="/setting" :ripple="false" draggable="false" variant="outlined">
                                <svg-icon type="mdi" :path="mdiPlus"></svg-icon>
                                <span class="text-subtitle-1 mx-1">Add Product</span>
                            </v-card>

                            <v-card class="d-flex align-center justify-center mt-2" color="primary" height="40"
                                width="140" href="/setting" :ripple="false" draggable="false" variant="flat" hover>
                                <svg-icon type="mdi" :path="mdiPencil"></svg-icon>
                                <span class="text-subtitle-1 mx-1">Edit Profile</span>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-card>

        <v-spacer style="height: 1.5rem;" />

        <v-card class="d-flex flex-column" min-height="100">
            <VSheets :items="products.products" :search-item="''" :custom-class="'mx-4'">
                <template #userProfile>
                    <v-btn style="pointer-events: none" icon>
                        <svg-icon type="mdi" :path="mdiHeart" />

                    </v-btn>
                    <span class="mt-n3" style="font-size: 0.55rem;">200k</span>
                </template>

                <template #edit="{ index }">
                    <v-btn text="Edit Product" variant="flat" base-color="green" rounded="0"
                        @click.prevent="forms.toggle(index)" flat block />
                </template>

                <template #dialog="{ index }">
                    <v-dialog v-model="forms.dialog.dialog[index]" persistent no-click-animation>
                        <v-card min-height="200" width="500" location="top center">

                            <v-hover v-slot="{ isHovering, props }">
                                <v-img v-bind="props"
                                    :src="products.products.images[index] || fileSelect.fileOuput.value" height="300"
                                    cover aspect-ratio="16/9">
                                    <v-overlay :model-value="!!isHovering"
                                        class="d-flex flex-row justify-center align-center"
                                        @click="fileSelect.triggerFileInput" contained persistent>
                                        <v-card class="d-flex align-center custom-card">
                                            <svg-icon type="mdi" class="mx-2 text-white" size="30"
                                                :path="mdiUpload"></svg-icon>
                                            <span class="text-h6 text-white">Upload Photo</span>

                                            <input type="file" accept="image/*" :ref="fileSelect.fileInput"
                                                class="d-none" @change="fileSelect.onFileSelected($event, index)" />
                                        </v-card>
                                    </v-overlay>
                                </v-img>
                            </v-hover>

                            <v-spacer class="my-5" />

                            <v-form class="d-flex flex-column align-center" ref="submitForm" id="form">

                                <v-text-field v-model="forms.formPush.name"
                                    :placeholder="products.products.names[index]" width="450" label="Product Name"
                                    variant="outlined" />
                                <div class="d-flex flex-row">

                                    <v-text-field v-model="forms.price.price"
                                        :placeholder="products.products.price[index].toString()" class="mx-3"
                                        width="213" label="Price" variant="filled"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />

                                    <v-text-field v-model="forms.discount.discount"
                                        :placeholder="String(products.products.discount_price[index])" class="mx-3"
                                        width="213" label="Discount Price" variant="filled"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />
                                </div>

                                <v-textarea v-model="forms.formPush.description"
                                    :placeholder="products.products.description[index]" width="450" density="compact"
                                    variant="outlined" label="Description" auto-grow></v-textarea>

                            </v-form>

                            <div class="my-3">
                                <v-btn :prepend-icon="mdiCheckBold" text="Done" variant="flat" base-color="green"
                                    rounded="0" @click="forms.submit(index)" width="400" location="bottom center"
                                    flat />
                            </div>

                            <div class="mb-4">
                                <v-btn :prepend-icon="mdiDeleteOutline" text="Delete" variant="flat" base-color="error"
                                    rounded="0" @click.prevent="forms.deleteProduct(index)" width="400"
                                    location="bottom center" flat />
                            </div>

                            <div class="mb-4">
                                <v-btn :prepend-icon="mdiClose" class="text-subtitle-2" text="Close" variant="text"
                                    rounded="0" @click.prevent="forms.toggle(index)" width="100"
                                    location="bottom center" :ripple="false" flat />
                            </div>

                        </v-card>
                    </v-dialog>
                </template>
            </VSheets>
        </v-card>
    </v-main>
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

/* ::v-deep(.v-label) {
    opacity: 1 !important;
} */
</style>