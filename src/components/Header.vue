<script lang="ts">
import { mergeProps } from 'vue';
import ProfilePic from '@/assets/profile.jpg';
import SvgIcon from '@jamescoyle/vue-icon'; // create types folder under src and declare it on module.d.ts 
import { mdiCart, mdiBell, mdiChat, mdiMagnify } from '@mdi/js';

export default {
    name: "Header",
    components: {
        SvgIcon,
    },

    data: () => ({
        carts: [{ product: 'Hi', link: '/cart' }, { product: 'Hi', link: '' }],
        notifications: [{ item: 'Hi', link: '' },
        { item: 'Hello', link: '/notifications' }
        ],
        messages: [{ message: 'Hi' }],
        lists: [
            { text: 'Profile', link: '/profile' },
            { text: 'Bookmarks', link: '/bookmarks' },
            { text: 'Store', link: '/products' },
            { text: 'Setting', link: '/setting' },
            { text: 'Logout', link: '/' }
        ],
        path: [mdiMagnify, mdiCart, mdiChat, mdiBell],
        profile: ProfilePic,
    }),

    methods: {
        isActive(link: string) {
            // Check if the current link is the active one
            return window.location.pathname === link; // Use pathname for route matching
        },
        mergeProps,
    }
}
</script>

<template>
    <section id="header">
        <v-app-bar :flat="true" color="#242424" app>
            <v-row class="d-flex align-center">
                <v-col col="1">
                    <v-btn icon variant="text" color="white" size="x-large" href="/">
                        <img width="100%" class="rounded-circle" :src="profile" />
                    </v-btn>
                </v-col>

                <v-col cols="8">
                    <v-card class="mx-auto w-50" variant="text">
                        <v-card-text>
                            <v-text-field placeholder="Search product..." variant="outlined" hide-details single-line>
                                <template v-slot:prepend-inner>
                                    <svg-icon type="mdi" :path="path[0]" />
                                </template>
                            </v-text-field>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col col="1" class="ma-n12">
                    <v-menu location="bottom">
                        <template v-slot:activator="{ props: menu }">
                            <v-btn icon v-bind="menu" variant="tonal" color="yellow" size="large">
                                <svg-icon type="mdi" :path="path[1]" />
                            </v-btn>
                        </template>

                        <v-list lines="one">
                            <!-- Show "Empty..." if all products/links are empty -->
                            <v-list-item v-if="carts.length === 0 || carts.every(cart => !cart.product || !cart.link)"
                                disabled>
                                <v-list-item-title>Empty...</v-list-item-title>
                            </v-list-item>

                            <!-- Show the valid products -->
                            <template v-for="(cart, c) in carts">
                                <v-list-item v-if="cart.link" :key="c" :value="cart" :to="cart.link">
                                    <v-list-item-title v-text="cart.product"></v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-list>

                    </v-menu>
                </v-col>

                <v-col col="1" class="ma-n12">
                    <v-menu location="bottom">
                        <template v-slot:activator="{ props: menu }">
                            <v-btn icon v-bind="menu" variant="tonal" color="yellow" size="large">
                                <svg-icon type="mdi" :path="path[2]" />
                            </v-btn>
                        </template>

                        <v-list lines="one">
                            <!-- Show "Empty..." if all products/links are empty -->
                            <v-list-item v-if="messages.length === 0 || messages.every(item => !item.message)" disabled>
                                <v-list-item-title>Empty...</v-list-item-title>
                            </v-list-item>

                            <!-- Show the valid products -->
                            <template v-for="(item, m) in messages">
                                <v-list-item v-if="item.message" :key="m" :value="item">
                                    <v-list-item-title v-text="item.message"></v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-menu>
                </v-col>

                <v-col col="1" class="ma-n12">
                    <v-menu location="bottom">
                        <template v-slot:activator="{ props: menu }">
                            <v-btn icon v-bind="menu" variant="tonal" color="yellow" size="large">
                                <svg-icon type="mdi" :path="path[3]" />
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
                    <v-menu location="bottom">
                        <template v-slot:activator="{ props: menu }">
                            <v-btn icon v-bind="menu" variant="text" color="white" size="large">
                                <img width="100%" class="rounded-circle" :src="profile" />
                            </v-btn>
                        </template>

                        <v-list lines="one">
                            <v-list-item v-for="(list, l) in lists" :key="l" :value="list" :to="list.link"
                                :class="{ active: isActive(list.link) }">
                                <v-list-item-title v-text="list.text"></v-list-item-title>
                            </v-list-item>
                        </v-list>
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

nav .active a,
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

    nav .active a,
    nav li a:hover {
        background-color: #4a4a4a;
        color: #FFF !important;
        transition: all ease 0.4s;
    }

    .active-menu {
        display: block !important;
        right: 0 !important;
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