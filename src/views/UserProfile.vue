<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload, mdiPencil, mdiAccount, mdiMessageProcessing, mdiCalendarAccount, mdiPlus } from '@mdi/js';
import NavDrawer from '@/components/NavDrawer.vue';
import VSheets from '@/components/VSheets.vue';
import EditDialog from '@/components/EditDialog.vue';
import UserForms from '@/components/Scripts/UserProfile'
import AddProduct from '@/components/AddProduct.vue'
import { useAuthStore } from '@/services/Session';
import { storeToRefs } from 'pinia';

const products = UserForms.Products;
const profile = UserForms.profile;

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const isLogin = computed(() => authStore.isAuthenticated)

const registerDate = user.value?.created_at ? new Date(user.value.created_at) : null;
const formattedDate = registerDate && !isNaN(registerDate.getTime())
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(registerDate)
    : 'Invalid date';


watch(() => user.value?.name, (newName) => {
    document.title = newName ? `${newName} - Profile` : 'Profile'
}, { immediate: true })

function fileSelection() {
    // Create a reference to the file input
    const fileInput = ref<HTMLInputElement | null>(null);
    const fileOuput = ref<string>('');

    const triggerFileInput = () => {
        if (fileInput.value) {
            fileInput.value.click();
        }
    };

    const uploadProfile = (event: Event, index: number) => {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files[0]) {
            const file = input.files[0];
            console.log('Selected file:', file);

            // Optional: handle file upload logic here, like sending it to a server
            const reader = new FileReader();

            // When the file is loaded
            reader.onload = () => {
                const base64Image = reader.result as string;

                // Update the image URL to show it on the card
                if (index === 0) {
                    profile.profile.coverPhoto = base64Image
                } else { profile.profile.profilePhoto = base64Image }

                // Save to localStorage
                localStorage.setItem(`Image_${index}`, base64Image);
            };
            reader.readAsDataURL(file); // Convert to Base64 if needed
        }
    };

    return { triggerFileInput, uploadProfile, fileOuput, fileInput }

};

function openDialog() {
    const dialog = reactive<{ dialog: { [key: number]: boolean } }>({ dialog: {} });
    const toggle = (index: number) => {
        dialog.dialog[index] = !dialog.dialog[index];
    };

    return { dialog, toggle };
};


</script>

<template>
    <NavDrawer />
    <v-main class="d-flex flex-column justify-center mx-16 py-5 px-16">
        <v-card class="d-flex flex-column" min-height="500">
            <v-hover v-slot="{ isHovering, props }">
                <v-img v-bind="props" :src="String(profile.profile.coverPhoto)" height="300" cover aspect-ratio="16/9">
                    <v-overlay :model-value="!!isHovering" class="d-flex flex-row justify-center align-center"
                        @click="fileSelection().triggerFileInput" contained persistent no-click-animation>

                        <v-card class="d-flex align-center custom-card" hover>
                            <svg-icon type="mdi" class="mx-2 text-white" size="30" :path="mdiUpload"></svg-icon>
                            <span class="text-h5 text-white">Upload Cover Photo</span>

                            <input type="file" accept="image/*" :ref="fileSelection().fileInput" class="d-none"
                                @change="fileSelection().uploadProfile($event, 0)" />
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
                                    :src="String(user?.avatar) || String(profile.profile.profilePhoto)" cover>
                                    <v-overlay :model-value="!!isHovering"
                                        class="d-flex felx-row justify-center align-center"
                                        @click="fileSelection().triggerFileInput" contained persistent
                                        no-click-animation>

                                        <v-card class="d-flex align-center custom-card" hover>
                                            <svg-icon type="mdi" class="mx-1 text-white" size="20"
                                                :path="mdiUpload"></svg-icon>
                                            <span class="text-subtitle-2 text-white">Upload Profile Photo</span>

                                            <input type="file" accept="image/*" :ref="fileSelection().fileInput"
                                                class="d-none" @change="fileSelection().uploadProfile($event, 1)" />
                                        </v-card>
                                    </v-overlay>
                                </v-img>
                            </v-avatar>
                        </v-hover>
                    </v-col>

                    <v-col cols="4" class="flex-grow-0 flex-shrink-1 mx-n3">
                        <div class="custom-card d-flex flex-column align-start ml-n10">
                            <v-card class="custom-card ">
                                <v-card-text class="font-weight-bold text-h4"
                                    :class="user?.name.length as number > 10 ? 'text-h5' : ''"
                                    style="line-height: 1.1;">{{ user?.name }}</v-card-text>
                                <v-card-text class="text-subtitle-1 mt-n8">{{ user?.role }}</v-card-text>
                            </v-card>
                        </div>
                    </v-col>

                    <v-col cols="3">
                        <div class="custom-card d-flex flex-column align-start">
                            <v-card class="custom-card d-flex align-center">
                                <svg-icon class="text-grey-darken-2" type="mdi" :path="mdiCalendarAccount"
                                    size="20"></svg-icon>
                                <span class="text-subtitle-2 font-weight-bold mx-1 text-grey-darken-2">Join:</span>
                                <span class="text-subtitle-2 mx-1 text-grey-darken-2">{{ formattedDate }}</span>
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
                        <AddProduct :is-login="isLogin" />
                    </v-col>
                </v-row>
            </div>
        </v-card>

        <v-spacer style="height: 1.5rem;" />

        <v-card v-if="products.products.names.length > 0" class="d-flex flex-column" min-height="100">
            <VSheets :items="products.products" :search-item="''" :custom-class="'mx-4'">

                <template #edit="{ index }">
                    <v-btn v-if="isLogin" text="Edit Product" variant="flat" base-color="green" rounded="0"
                        @click.prevent="openDialog().toggle(index)" flat block />
                </template>

                <template #dialog="{ index }">
                    <EditDialog :index="index" :products="products" :toggle="openDialog()" />
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