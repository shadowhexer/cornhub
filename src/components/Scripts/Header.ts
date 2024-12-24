import { reactive, ref } from 'vue';
import ProfilePic from '@/assets/profile.jpg';
import UserForms from '@/components/Scripts/UserProfile'
import { mdiBookmarkBoxMultiple, mdiCog, mdiMessageAlert, mdiLogout } from '@mdi/js';
import API from '@/services/api'

// Define types for the reactive objects
type Cart = {
    title: string;
    names: string[],
    images: string[],
    store: string[],
    price: number[],
    discount: number[],
    finalPrice: number[],
    category: string[],
    bookmarked: boolean[],
    dateAdded: number[],
    link: string[],
    description: string[],
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

type Status = {
    logged_in: boolean;
    user: string;
};

const images = UserForms.profile;

const isLogin = reactive<Status>({
    logged_in: false,
    user: '',
});
let previousState = isLogin.logged_in;

(async function check(){
    try {
        const response = await API.get('/api/verify');
        if(response.data.logged_in === true) {
            isLogin.logged_in = response.data.logged_in;
        }
        previousState = isLogin.logged_in;
    } catch (error) {
        console.error('Session verification failed:', error);
        isLogin.logged_in = false;
        return;
    }
    setTimeout(check, 300000);
})();

const dates = new Date('2024-12-03T10:00:00');
const date2 = new Date('2024-11-03T10:00:00');

const carts = reactive<Cart>({
    title: 'Cart',
    names: [],
    images: [],
    store: [],
    price: [],
    discount: [],
    finalPrice: [],
    category: [],
    bookmarked: [],
    dateAdded: [],
    link: [],
    description: [],
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
    text: ['Bookmarks', 'Setting', 'Give Feedback'],
    link: ['/bookmarks', '/setting', '/feedback'],
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


export default { carts, messages, notif, menu, ProfilePic, isLogin };