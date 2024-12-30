<template>
    <div>
        <p>Processing login...</p>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/services/Session';
import UserProfile from './Scripts/UserProfile';
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)

const router = useRouter();

onMounted(() => {
    // Extract the token and user data from the query parameters
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const userJson = query.get('user');

    if (token && userJson) {
        // Parse the user data
        const user = JSON.parse(userJson);
        authStore.setAuth(token, user); // Save to the store
        UserProfile.isLogin.logged_in = isLoggedIn.value;
        router.push('/');
    } else {
        // Handle error: token or user data is missing
        console.error('Token or user data is missing');
        router.push('/login');
    }
});
</script>