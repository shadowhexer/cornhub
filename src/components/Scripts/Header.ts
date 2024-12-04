import { reactive } from 'vue';
import ProfilePic from '@/assets/profile.jpg';
import { mdiBookmarkBoxMultiple, mdiCog, mdiLogout } from '@mdi/js';

// Define types for the reactive objects
type Cart = {
    title: string;
    images: string[]; // Assuming it's an array of image URLs (strings)
    product: string[];
    store: string[];
    link: string[];
};

type Message = {
    title: string;
    avatar: any[]; // Use `any` if ProfilePic can have multiple types, otherwise replace with its type
    author: string[];
    item: string[];
    link: string[];
};

type Notification = {
    title: string;
    avatar: any[];
    item: string[];
    link: string[];
};

type Menu = {
    profilePic: any; // Replace `any` with the actual type of ProfilePic
    name: string;
    type: string;
    icon: string[]; // Assuming mdi icons are strings
    text: string[];
    link: string[];
};

const carts = reactive<Cart>({
    title: 'Cart',
    images: [],
    product: ['Hi', 'Hello'],
    store: ['Chelsea', 'Haru'],
    link: ['/', ''],
});

const messages = reactive<Message>({
    title: 'Messages',
    avatar: [ProfilePic, ProfilePic],
    author: ['Haru', 'System'],
    item: ['Hi', 'Okay ra ka?'],
    link: ['/messages', ''],
});

const notif = reactive<Notification>({
    title: 'Notifications',
    avatar: [ProfilePic, ProfilePic],
    item: ['Pahibalo si Zilong nag lulu sa kilid', 'Hello'],
    link: ['', '/notification']
});

const menu = reactive<Menu>({
    profilePic: ProfilePic,
    name: 'Hexer',
    type: 'admin',
    icon: [mdiBookmarkBoxMultiple, mdiCog, mdiLogout],
    text: ['Bookmarks', 'Setting', 'Logout'],
    link: ['/bookmarks', '/setting', '/']
});

export default { carts, messages, notif, menu, ProfilePic };