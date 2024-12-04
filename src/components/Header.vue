<script setup lang="ts">
import { reactive } from 'vue';
import ProfilePic from '@/assets/profile.jpg';
import SvgIcon from '@jamescoyle/vue-icon'; // create types folder under src and declare it on module.d.ts 
import { mdiCart, mdiBell, mdiChat, mdiMagnify, mdiBookmarkBoxMultiple, mdiCog, mdiLogout, mdiDotsHorizontal } from '@mdi/js';
import VMenus from './VMenus.vue';
import ProfileMenu from './ProfileMenu.vue';

const carts = reactive({
    title: 'Cart',
    color: 'green',
    images: [],
    product: ['Hi', 'Hello'],
    store: ['Chelsea', 'Haru'],
    link: ['/', ''],
})

const messages = reactive({
    title: 'Messages',
    color: 'blue',
    avatar: [ProfilePic, ProfilePic],
    author: ['Haru', 'System'],
    item: ['Hi', 'Okay ra ka?'],
    link: ['/messages', ''],
});

const notif = reactive({
    title: 'Notifications',
    color: 'red',
    avatar: [ProfilePic, ProfilePic],
    item: ['Pahibalo si Zilong nag lulu sa kilid', 'Hello'],
    link: ['', '/notification']
})

const menu = reactive({
    profilePic: ProfilePic,
    name: 'Hexer',
    type: 'admin',
    icon: [mdiBookmarkBoxMultiple, mdiCog, mdiLogout],
    text: ['Bookmarks', 'Setting', 'Logout'],
    link: ['/bookmarks', '/setting', '/']
})

</script>

<template>
    <section id="header">
        <v-app-bar :flat="true" color="amber-accent-4" sticky app>
            <v-row class="d-flex align-center">

                <!-- Logo -->

                <v-col col="1">
                    <v-btn icon variant="text" color="white" size="x-large" href="/">
                        <img width="100%" class="rounded-circle" :src="ProfilePic" />
                    </v-btn>
                </v-col>

                <!-- Search bar -->

                <v-col cols="8">
                    <v-card class="mx-auto w-75" variant="text">
                        <v-card-text>
                            <v-text-field density="compact" placeholder="Search product..." variant="solo-filled"
                                bg-color="white" flat hide-details single-line>
                                <template v-slot:prepend-inner>
                                    <svg-icon type="mdi" :path="mdiMagnify" />
                                </template>
                            </v-text-field>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- Cart -->

                <v-col col="1" class="ma-n12">
                    <VMenus :offset="[5, 0]"
                        :items="{ header: carts.title, btnColor: carts.color, icon: carts.images, title: carts.product, author: carts.store, link: carts.link }">

                        <template #default="{ icons }">
                            <svg-icon type="mdi" :path="icons === 'icon' ? mdiCart : mdiDotsHorizontal" />
                        </template>
                    </VMenus>
                </v-col>

                <!-- Messages -->

                <v-col col="1" class="ma-n12">
                    <VMenus :offset="[5, 0]"
                        :items="{ header: messages.title, btnColor: messages.color, icon: messages.avatar, title: messages.item, author: messages.author, link: messages.link }">

                        <template #default="{ icons }">
                            <svg-icon type="mdi" :path="icons === 'icon' ? mdiChat : mdiDotsHorizontal" />
                        </template>

                    </VMenus>
                </v-col>

                <!-- Notification -->

                <v-col col="1" class="ma-n12">
                    <VMenus :offset="[5, 0]"
                        :items="{ header: notif.title, btnColor: notif.color, icon: notif.avatar, title: notif.item, author: [], link: notif.link }">
                        
                        <template #default="{ icons }">
                            <svg-icon type="mdi" :path="icons === 'icon' ? mdiBell : mdiDotsHorizontal" />
                        </template>

                    </VMenus>
                </v-col>

                <!-- Profile Menu -->

                <v-col col="1" class="ma-n12">
                    <ProfileMenu :menu="menu">
                        <template #default="{ icon, index }">
                            <svg-icon type="mdi" :path="menu.icon[index]" class="mx-2" />
                        </template>
                    </ProfileMenu>
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