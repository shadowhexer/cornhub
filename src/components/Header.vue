<script setup lang="ts">
import { mergeProps, reactive } from 'vue';
import ProfilePic from '@/assets/profile.jpg';
import SvgIcon from '@jamescoyle/vue-icon'; // create types folder under src and declare it on module.d.ts 
import { mdiCart, mdiBell, mdiChat, mdiMagnify } from '@mdi/js';

const profile = ProfilePic;
const icons = reactive({
    path: [mdiMagnify, mdiCart, mdiChat, mdiBell],
});

const carts = reactive({
    product: ['Hi', 'Hello'],
    link: ['/', ''],
})

const messages = reactive({
    avatar: [profile, profile],
    author: ['Haru', 'System'],
    item: ['Hi', 'Okay ra ka?']
});

</script>

<script lang="ts">


export default {
    name: "Header",
    components: {
        SvgIcon,
    },

    data: () => ({
        
        notifications: [{ item: 'Hi', link: '' },
        { item: 'Hello', link: '/notification' }
        ],
        lists: [
            {icon: 'mdi', text: 'Bookmarks', link: '/bookmarks' },
            {icon: '', text: 'Setting', link: '/setting' },
            {icon: '', text: 'Logout', link: '/' }
        ],
    }),

    methods: {
        // isActive(link: string) {
        //     // Check if the current link is the active one
        //     return window.location.pathname === link; // Use pathname for route matching
        // },
        mergeProps,
    },
}
</script>

<template>
    <section id="header">
        <v-app-bar :flat="true" color="amber-accent-4" sticky app>
            <v-row class="d-flex align-center">
                <v-col col="1">
                    <v-btn icon variant="text" color="white" size="x-large" href="/">
                        <img width="100%" class="rounded-circle" :src="profile" />
                    </v-btn>
                </v-col>

                <v-col cols="8">
                    <v-card class="mx-auto w-75" variant="text">
                        <v-card-text>
                            <v-text-field density="compact" placeholder="Search product..." variant="solo-filled"
                                bg-color="white" flat hide-details single-line>
                                <template v-slot:prepend-inner>
                                    <svg-icon type="mdi" :path="icons.path[0]" />
                                </template>
                            </v-text-field>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col col="1" class="ma-n12">
                    <v-menu location="bottom">
                        <template v-slot:activator="{ props: menu }">
                            <v-btn icon v-bind="menu" variant="elevated" :elevation="0" color="green" size="large">
                                <svg-icon type="mdi" :path="icons.path[1]" />
                            </v-btn>
                        </template>

                        <v-list lines="one">
                            <!-- Show "Empty..." if all products/links are empty -->
                            <v-list-item v-if="carts.product.length === 0 || carts.product.every((item, index) => !item || !carts.link[index])"
                                disabled>
                                <v-list-item-title>Empty...</v-list-item-title>
                            </v-list-item>

                            <!-- Show the valid products -->
                            <template v-for="(item, c) in carts.product" :key="c">
                                <v-list-item v-if="carts.link[c]" :value="item" :href="carts.link[c]">
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-list>

                    </v-menu>
                </v-col>

                <v-col col="1" class="ma-n12">
                    <v-menu :offset="[5, 200]">
                        <template v-slot:activator="{ props: menu }">
                            <v-btn icon v-bind="menu" variant="elevated" :elevation="0" color="blue" size="large">
                                <svg-icon type="mdi" :path="icons.path[2]" />
                            </v-btn>
                        </template>

                        <v-card min-width="400">

                            <v-list class="mx-1">
                                <v-list-item >
                                    <template #title>
                                        <span class="text-h6 font-weight-bold">Messages</span>
                                    </template>

                                </v-list-item>
                            </v-list>

                            <v-divider class="mx-7" opacity="0.3" />

                            <v-list lines="two" class="mx-1">
                                <!-- Show "Empty..." if all products/links are empty -->
                                <v-list-item 
                                    v-if="messages.item.length === 0 || 
                                    messages.item.every((item, index) => 
                                    !messages.item[index])" 
                                    disabled>
                                    <v-list-item-title>Empty...</v-list-item-title>
                                </v-list-item>

                                <!-- Show the valid products -->
                                <template v-for="(item, m) in messages.item">
                                    <v-list-item 
                                        v-if="messages.item[m]" 
                                        :key="m" 
                                        :value="item" 
                                        :prepend-avatar="messages.avatar[m]">

                                        <template #title>
                                            <span class="font-weight-bold">{{ messages.author[m] }}</span>
                                        </template>

                                        <template #subtitle>
                                            <span>{{ item }}</span>
                                        </template>

                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-card>
                        
                    </v-menu>
                </v-col>

                <v-col col="1" class="ma-n12">
                    <v-menu location="bottom">
                        <template v-slot:activator="{ props: menu }">
                            <v-btn icon v-bind="menu" variant="elevated" :elevation="0" color="red" size="large">
                                <svg-icon type="mdi" :path="icons.path[3]" />
                            </v-btn>
                        </template>

                        <v-list lines="one">
                            <!-- Show "Empty..." if all products/links are empty -->
                            <v-list-item
                                v-if="notifications.length === 0 || notifications.every(notif => !notif.item || !notif.link)"
                                disabled>
                                <v-list-item-title>Empty...</v-list-item-title>
                            </v-list-item>

                            <!-- Show the valid products -->
                            <template v-for="(notif, n) in notifications">
                                <v-list-item v-if="notif.link" :key="n" :value="notif" :to="notif.link">
                                    <v-list-item-title v-text="notif.item"></v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-menu>
                </v-col>

                <v-col col="1" class="ma-n12">
                    <v-menu :offset="[5, 70]" >
                        <template v-slot:activator="{ props: menu }">
                            <v-btn icon v-bind="menu" variant="text" color="white" size="large">
                                <v-avatar size="x-large">
                                    <v-img :src="profile" aspect-ratio="1/1" cover />
                                </v-avatar>
                            </v-btn>
                        </template>

                        <v-card min-width="300">
                            <v-list>
                                <v-list-item :prepend-avatar="profile" href="/profile">
                                    <template #title>
                                        <span class="text-h6 font-weight-bold">Hexer</span>
                                    </template>

                                    <template #subtitle>
                                        admin
                                    </template>
                                </v-list-item>
                            </v-list>

                            <v-divider class="mx-5" opacity="0.3" />

                            <v-list lines="one">
                                <v-list-item v-for="(list, l) in lists" :key="l" :prepend-icon="list.icon" :value="list" :href="list.link">
                                    <v-list-item-title v-text="list.text"></v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-card>

                    </v-menu>
                </v-col>

            </v-row>
        </v-app-bar>
    </section>
</template>

<style scoped>
ul {
    list-style: none;
}

a {
    text-decoration: none;
}

.v-application__wrap {
    min-height: fit-content !important;
    padding: 0 !important;
    margin: 0 !important;
}


.logo:hover {
    filter: contrast(250%);
}

nav li a {
    padding: 10px 15px;
    color: #bbc3de;
    font-size: 15px;
    margin: 10px 15px;
}

nav a,
nav a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s;
    font-weight: bold;
}

nav li a:hover {
    background-color: #29292900;
    color: rgb(47, 255, 47) !important;
    transition: all ease 0.4s;
}

.toggle {
    display: none;
}

.fi.fis {
    width: 2em !important;
    margin: 5px 0px;
}

@media (min-width: 801.60px) {
    .v-app-bar {
        top: 0;
        left: 0;
        width: 100%;
        padding: 10px 50px;
    }

    .v-navigation-drawer {
        display: none !important;
        width: 0 !important;
    }
}

@media(max-width:1190px) {
    #header {
        background-size: 1150px !important;
    }
}

@media(max-width:970px) {
    #header {
        background-image: none !important;
    }
}

@media(max-width: 800px) {

    .v-app-bar {
        padding: 0 50px;
        letter-spacing: 2px;
    }

    v-list a {
        color: darkgreen !important;
    }

    nav {
        width: 200px !important;
    }

    nav a,
    nav a:focus {
        display: flex;
        align-items: center;
        justify-content: center !important;
        transition: 0.3s;
        font-weight: bold;
    }

    nav ul {
        display: none !important;
    }

    nav ul li a {
        border-bottom: 1px solid rgba(255, 255, 255, 0.212);
        color: #ffffff !important;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px !important;
        padding: 0px !important;
    }

    nav ul {
        padding: 0px;
        margin: 0px;
    }

    nav li a:hover {
        background-color: #4a4a4a;
        color: #FFF !important;
        transition: all ease 0.4s;
    }

    nav ul li a:hover {
        background-color: rgba(27, 29, 32, 0.15);

    }
}

@media (max-width: 432px) {
    .v-app-bar {
        padding: 0 5px;
        letter-spacing: 2px;
    }
}
</style>