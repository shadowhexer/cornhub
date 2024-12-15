<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload, mdiPencil, mdiAccount, mdiMessageProcessing, mdiCalendarAccount } from '@mdi/js';
import md5 from 'md5';
import { sha256 } from '@noble/hashes/sha256';
import axios from 'axios';
import cover from '@/assets/cover.jpg'
import profilePic from '@/assets/profile.jpg'

const profile = ref<string>('Hexer')
const email = ref('austinmanlangit@gmail.com');
const retrieve = ref([]);
const overlay = ref<boolean>(false);

onMounted(() => {
    document.title = profile.value + ' - Profile';
});



const getGravatarUrl = (email: string, size: number = 200): string => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
};

const gravatarUrl = computed(() => getGravatarUrl(email.value, 300));

</script>

<template>
    <v-main class="d-flex flex-column justify-center mx-16 pa-16">
        <v-card class="d-flex flex-column" flat min-height="500">
            <v-hover v-slot="{ isHovering, props }">
                <v-img v-bind="props" :src="cover" height="300" cover aspect-ratio="16/9">
                    <v-overlay :model-value="!!isHovering" class="d-flex felx-row justify-center align-center" contained
                        persistent>
                        <v-card class="d-flex align-center custom-card" hover>
                            <svg-icon type="mdi" class="mx-2 text-white" size="30" :path="mdiUpload"></svg-icon>
                            <span class="text-h5 text-white">Upload Cover Photo</span>
                        </v-card>

                    </v-overlay>
                </v-img>
            </v-hover>


            <div class="d-flex flex-row justify-space-between my-n5">
                <v-hover v-slot="{ isHovering, props }">
                    <v-avatar v-bind="props" size="200" class="mt-n16 ml-16 mr-n16 border-md border-opacity-100">
                        <v-img rounded="circle" class="" aspect-ratio="1/1" width="100" :src="profilePic" cover>
                            <v-overlay :model-value="!!isHovering" class="d-flex felx-row justify-center align-center"
                                contained persistent>
                                <v-card class="d-flex align-center custom-card" hover>
                                    <svg-icon type="mdi" class="mx-1 text-white" size="20" :path="mdiUpload"></svg-icon>
                                    <span class="text-subtitle-2 text-white">Upload Profile Photo</span>
                                </v-card>
                            </v-overlay>
                        </v-img>
                    </v-avatar>
                </v-hover>

                <v-card class="custom-card ml-n10 my-10">
                    <v-card-text class=" text-h4 font-weight-bold d-flex flex-column">
                        Hexer
                        <span class="text-subtitle-1 mt-n2">Seller</span>
                    </v-card-text>
                </v-card>


                <div class="custom-card d-flex flex-column align-start mx-10 my-15">
                    <v-card class="custom-card d-flex align-center">
                        <svg-icon class="text-grey-darken-2" type="mdi" :path="mdiCalendarAccount" size="20"></svg-icon>
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
                        <span class="text-subtitle-2 font-weight-bold mx-1 text-grey-darken-2">Response rate:</span>
                        <span class="text-subtitle-2 mx-1 text-grey-darken-2">85.1%</span>
                    </v-card>
                </div>

                <v-card class="d-flex align-center justify-center mx-16 my-15" color="primary" height="40" width="130"
                    href="/setting" :ripple="false" draggable="false" variant="flat" hover>
                    <svg-icon type="mdi" :path="mdiPencil"></svg-icon>
                    <span class="text-subtitle-1 mx-1">Edit Profile</span>
                </v-card>


            </div>

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