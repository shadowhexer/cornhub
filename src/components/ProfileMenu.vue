<script setup lang="ts">
import type { Ref } from 'vue';
import router from '@/router';


const props = defineProps<{
    menu: {
        profilePic: string,
        name: string,
        type: string,
        icon: string[],
        text: string[],
        link: string[],
        status: any,
    }
    axios: any,
}>()

const logout = async () => {
    try {
        // Step 1: Fetch CSRF token
        await props.axios.get('/sanctum/csrf-cookie', { withCredentials: true });

        // Step 2: Call logout endpoint
        const response = await props.axios.post('/logout', {}, { withCredentials: true });

        if (response.data.status === 'success') {
            // Step 3: Update frontend state
            props.menu.status.logged_in = 'false';

            // Step 4: Redirect to the home page
            router.push('/');
        } else {
            console.error('Unexpected response:', response.data);
        }
    } catch (error: any) {
        console.error('Logout failed:', error.response?.data || error.message);
    }
};


const login = () => {
    window.open('http://api.onlycorn.com:8000/login', '_blank', 'noopener,noreferrer');
}
</script>

<template>
    <v-menu :offset="[5, 0]">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="text" color="white" size="default">
                <v-avatar size="large">
                    <v-img :src="menu.profilePic" aspect-ratio="1/1" cover />
                </v-avatar>
            </v-btn>
        </template>



        <v-card min-width="300">
            <v-card max-width="275" min-height="90" location="bottom center" class="my-3" elevation="3">
                <v-list>
                    <v-list-item href="/profile">
                        <template #prepend>
                            <v-avatar :image="menu.profilePic" size="x-large" />
                        </template>
                        <template #title>
                            <span class="text-h6 font-weight-bold">{{ menu.name }}</span>
                        </template>

                        <template #subtitle>
                            {{ menu.type }}
                        </template>
                    </v-list-item>
                </v-list>
                <v-divider class="mx-5" opacity="0.3" />
                <v-spacer />
            </v-card>

            <v-list lines="one">
                <v-list-item v-for="(list, l) in menu.text" :key="l" :value="list"
                    :href="menu.link[l] as string | undefined">
                    <template #prepend>
                        <slot :icon="menu.icon" :index="l" />
                    </template>
                    <v-list-item-title v-text="list" />
                </v-list-item>

                <v-list-item @click.prevent="logout()">
                    <template #prepend>
                        <slot :icon="menu.icon" :index="3" />
                    </template>
                    <v-list-item-title v-text="'Logout'" />
                </v-list-item>
            </v-list>
        </v-card>

    </v-menu>

</template>