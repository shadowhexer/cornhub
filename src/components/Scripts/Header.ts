import { reactive, ref } from 'vue';
import ProfilePic from '@/assets/profile.jpg';
import UserForms from '@/components/Scripts/UserProfile'
import { mdiBookmarkBoxMultiple, mdiCog, mdiMessageAlert, mdiLogout } from '@mdi/js';

// Define types for the reactive objects
type Cart = {
    title: string;
    images: string[]; // Assuming it's an array of image URLs (strings)
    product: string[];
    store: string[];
    price: number[];
    link: string[];
};

type Message = {
    title: string;
    avatar: any[]; // Use `any` if ProfilePic can have multiple types, otherwise replace with its type
    author: string[];
    item: string[];
    date: number[] | Date[];
    link: string[];
    read: boolean[];
};

type Notification = {
    title: string;
    avatar: any[];
    item: string[];
    date: number[] | Date[];
    link: string[];
    read: boolean[];
};

type Menu = {
    profilePic: any; // Replace `any` with the actual type of ProfilePic
    name: string;
    type: string;
    icon: string[]; // Assuming mdi icons are strings
    text: string[];
    link: string[];
};

const images = UserForms.profile;

const dates = new Date('2024-12-03T10:00:00');
const date2 = new Date('2024-11-03T10:00:00')

const carts = reactive<Cart>({
    title: 'Cart',
    images: [],
    product: [],
    store: [],
    price: [],
    link: [],
});

const messages = reactive<Message>({
    title: 'Messages',
    avatar: [ProfilePic, ProfilePic, ProfilePic, ProfilePic],
    author: ['Haru', 'System', 'Alice', 'Chelsea'],
    item: ['Pahibalo si Zilong nag lulu sa kilid. Tu ara oh nasakpan na navideohan', 'Okay ra ka?', 'Hehehhee', 'palit na'],
    date: [dates, date2, date2, dates],
    link: ['/messages', '/', '/'],
    read: [false, false, false, false],
});

const notif = reactive<Notification>({
    title: 'Notifications',
    avatar: [ProfilePic, ProfilePic, ProfilePic],
    item: ['Pahibalo si Zilong nag lulu sa kilid. Tu ara oh nasakpan na navideohan nakita sa camera! Kalood nimo oy. Alangan kadtong mga seksi seksi nako ba mag Tiktok unta ko.', 'Hello', 'Di makita'],
    date: [date2, dates, dates],
    link: ['', '/notification', ''],
    read: [false, false, false],
});

const menu = reactive<Menu>({
    profilePic: images.profile.profilePhoto,
    name: 'Hexer',
    type: 'admin',
    icon: [mdiBookmarkBoxMultiple, mdiCog, mdiMessageAlert, mdiLogout],
    text: ['Bookmarks', 'Setting', 'Give Feedback', 'Logout'],
    link: ['/bookmarks', '/setting', '/']
});

// Functions
export const isRead = ref({
    notif: [] as boolean[],
    messages: [] as boolean[],
});

export function markAsRead() {
    const markIndividual = async (index: number, source: 'notif' | 'messages') => {
        try {
            if (source === 'messages') {
                messages.read[index] = true;
            } else if (source === 'notif') {
                notif.read[index] = true;
            }

            // await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error("Failed ", error);
        }
    };

    const markAll = async (source: 'notif' | 'messages') => {
        try {
            if (source === 'messages') {
                messages.read.forEach((_, index) => {
                    messages.read[index] = true;
                });
            } else if (source === 'notif') {
                notif.read.forEach((_, index) => {
                    notif.read[index] = true;
                });
            } // Mark all items as read
            // await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            console.error("Failed ", error);
        }
    };

    return { markIndividual, markAll }
}


export default { carts, messages, notif, menu, ProfilePic };