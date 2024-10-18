<script setup lang="ts">
</script>

<template>
    <nav>
        <v-content>
            <router-view /> <!-- This line is equivalent to <RouterLink to="/"> </RouterLink> -->
            <v-list lines="one">
                <v-list-item v-for="(list, l) in lists" :key="l" :value="list" :to="list.link">
                    <v-list-item-title v-text="list.text"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-content>
    </nav>
</template>

<script lang="ts">
export default {
    data: () => ({
        lists: [
            { text: 'Home', link: '/' },
            { text: 'Notifications', link: '/notification' },
            { text: 'Messages', link: '/messages' },
            { text: 'Bookmarks', link: '/bookmarks' },
            { text: 'Store', link: '/products' },
            { text: 'Cart', link: '/cart' },
            { text: 'Payment Methods', link: '/payment-method' },
            { text: 'Profile', link: '/profile' },
            { text: 'Setting', link: '/setting' }
        ]
    }),
}
</script>