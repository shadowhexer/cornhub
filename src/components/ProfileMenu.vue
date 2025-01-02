<script setup lang="ts">
import { computed, type Ref } from 'vue';
import API from '@/services/api';
import router from '@/router';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/services/Session'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)


const props = defineProps<{
    menu: {
        profilePic: string,
        icon: string[],
        text: string[],
        link: string[],
    }
}>()

const logout = async () => {
    try {

        await API.get('/sanctum/csrf-cookie').then(async () => {
            const response = await API.post('/logout')

            if (response.data.status === 'success') {
                authStore.logout() // Clears token and user?
                router.push('/')
            } else {
                console.error('Unexpected response:', response.data);
            }
        });
    } catch (error: any) {
        console.error('Logout failed:', error.response?.data || error.message);
    }
}

const login = () => {
    window.open('http://api.onlycorn.com:8000/login', '_blank', 'noopener,noreferrer');
}
</script>

<template>
    <v-menu :offset="[5, 0]">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="text" color="white" size="default">
                <v-avatar size="large">
                    <v-img :src="menu.profilePic || user?.avatar" aspect-ratio="1/1" cover />
                </v-avatar>
            </v-btn>
        </template>



        <v-card min-width="300">
            <v-card max-width="275" min-height="90" location="bottom center" class="my-3" elevation="3">
                <v-list>
                    <v-list-item href="/profile">
                        <template #prepend>
                            <v-avatar :image="user?.avatar" size="x-large" />
                        </template>
                        <template #title>
                            <span class="text-h6 font-weight-bold">{{ user?.name }}</span>
                        </template>

                        <template #subtitle>
                            {{ user?.role }}
                        </template>
                    </v-list-item>
                </v-list>
                <v-divider class="mx-5" opacity="0.3" />
                <v-spacer />
            </v-card>

            <v-list lines="one">
                <v-list-item v-for="(list, l) in menu.text" :key="l" :value="list"
                    :href="menu.link[l]">
                    <template #prepend>
                        <slot :icon="menu.icon" :index="l" />
                    </template>
                    <v-list-item-title v-text="list" />
                </v-list-item>

                <v-list-item @click="logout">
                    <template #prepend>
                        <slot :icon="menu.icon" :index="3" />
                    </template>
                    <v-list-item-title v-text="'Logout'" />
                </v-list-item>
            </v-list>
        </v-card>

    </v-menu>

</template>