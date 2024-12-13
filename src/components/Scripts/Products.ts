import { reactive } from "vue";

type Prodcts = {
    names: string[],
    images: string[],
    store: string[],
    price: number[],
    discount_price: number[],
    bookmarked: boolean[],
    link: string[],
}

const products = reactive<Prodcts>({
    names: ['Yellow Corn that goes hard when boiled etc etc etc blah blah', 'Blue Seeds', 'Green Corn', 'Red Pops', 'Orange Corn', 'Green Corns',],
    images: ['https://project-imas.wiki/images/d/df/HaruSR10%2B.jpg', '', '', '', '', ''],
    store: ['Arisu', 'Haru', 'Haru', 'Chelsea', 'Arisu', 'Chelsea'],
    price: [1500, 200, 300, 350, 100, 50],
    discount_price: [500, 50, 0, 0, 25, 0],
    bookmarked: [false, false, false, false, false, false],
    link: ['/', '', '/', '', '', '/'],
});

export default { products };