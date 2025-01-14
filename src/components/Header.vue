<script setup lang="ts">
import API from '@/services/api';
import Header, { markAsRead } from './Scripts/Header';
import SvgIcon from '@jamescoyle/vue-icon'; // create types folder under src and declare it on module.d.ts 
import VMenus from './VMenus.vue';
import ProfileMenu from './ProfileMenu.vue';
import { mdiBasket, mdiBell, mdiChat, mdiMagnify } from '@mdi/js';
import { useAuthStore } from '@/services/Session'
import { computed, onMounted } from 'vue';
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)

const { markIndividual, markAll } = markAsRead();

const cartBadge = computed(() => Header.carts.reduce((total: number, cart: { products?: any[] }) => total + (cart.products?.length || 0), 0));

onMounted(async () => {
    if (isLoggedIn.value) { // Ensure `isLoggedIn` is a ref or computed property
        try {
            // Fetch CSRF cookie
            await API.get('/sanctum/csrf-cookie');

            // Fetch cart data
            const response = await API.get('/api/cart');

            if (response.data) {
                console.log("Cart: ", response.data);

                // Push each item into the Header.carts arrays
                response.data.forEach((item: {cart_id: number, store_id: number, store_name: string, products: Array<{product_id: number, product_name: string, quantity: number, price: number, image_url: string}>}) => {
                    Header.carts.push({
                        cart_id: item.cart_id,
                        store_id: item.store_id,
                        store_name: item.store_name,
                        products: item.products.map((product) => ({
                            product_id: product.product_id,
                            product_name: product.product_name,
                            quantity: product.quantity,
                            price: product.price,
                            image_url: product.image_url,
                        })),
                    });
                });
            }
            console.log("Cart: ", Header.carts)
        } catch (error) {
            console.error("Error fetching cart data: ", error);
        }
    }
});

</script>

<template>
    <section id="header">
        <v-app-bar :flat="true" color="amber-accent-4" density="compact" ima sticky app>

            <template #image>
                <v-img src="/src/assets/Header.jpg" height="100%" width="100%" cover
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" />
            </template>

            <v-row class="d-flex align-center">

                <!-- Logo -->

                <v-col col="1">
                    <a variant="text" color="white" size="default" href="/" :ripple="false">
                        <span class="text-h4 text-white logo-text">OnlyCorn</span>
                    </a>
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

                    <v-btn v-if="isLoggedIn" icon variant="elevated" :elevation="0" color="green" size="default" href="/cart">
                        <v-badge 
                            :model-value="cartBadge > 0" 
                            :content="cartBadge"
                            color="brown-darken-3" 
                            bordered
                        >
                            <svg-icon type="mdi" :path="mdiBasket" />
                        </v-badge>
                    </v-btn>

                </v-col>

                <!-- Messages -->

                <v-col col="1" class="ma-n12">
                    <VMenus v-if="isLoggedIn" :offset="[5, 0]"
                        :items="{ header: Header.messages.title, icon: Header.messages.avatar, title: Header.messages.item, subtitle: Header.messages.author, link: Header.messages.link, extra: Header.messages.date as number[] | undefined }"
                        :type="'messages'" :btn-color="'blue'" :mark-individual="markIndividual"
                        :is-read="Header.messages.read">

                        <template #icons>
                            <svg-icon type="mdi" :path="mdiChat" />
                        </template>

                        <template #mark>
                            <a class="text-subtitle-2" type="button" text="Mark all as read"
                                @click.stop="markAll('messages')" />
                        </template>

                    </VMenus>
                </v-col>

                <!-- Notification -->

                <v-col col="1" class="ma-n12">
                    <VMenus v-if="isLoggedIn" :offset="[5, 0]"
                        :items="{ header: Header.notif.title, icon: Header.notif.avatar, title: Header.notif.item, link: Header.notif.link, extra: Header.notif.date as number[] | undefined }"
                        :type="'notif'" :btn-color="'red'" :mark-individual="markIndividual"
                        :is-read="Header.notif.read">

                        <template #icons>
                            <svg-icon type="mdi" :path="mdiBell" />
                        </template>

                        <template #mark>
                            <a class="text-subtitle-2" type="button" text="Mark all as read"
                                @click.stop="markAll('notif')" />
                        </template>

                    </VMenus>
                </v-col>

                <!-- Profile Menu -->

                <v-col v-if="isLoggedIn" col="1" class="ma-n12">
                    <ProfileMenu :menu="Header.menu">
                        <template #default="{ index }">
                            <svg-icon type="mdi" :path="Header.menu.icon[index]" class="mx-2" />
                        </template>
                    </ProfileMenu>
                </v-col>

                <v-col v-else col="1" class="ma-n12">
                    <v-btn class="mx-n2" color="white" href="/login" text="Sign in" />
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

.logo-text {
    font-family: 'Gardenia' !important;
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