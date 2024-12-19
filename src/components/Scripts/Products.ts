import { reactive } from "vue";

type Products = {
    names: string[],
    images: string[],
    store: string[],
    price: number[],
    discount_price: number[],
    bookmarked: boolean[],
    link: string[],
    description: string[],
}

const products = reactive<Products>({
    names: ['Yellow Corn that goes hard when boiled etc etc etc blah blah', 'Blue Seeds', 'Green Corn', 'Red Pops', 'Orange Corn', 'Green Corns',],
    images: ['', '', '', '', '', '',],
    store: ['Arisu', 'Haru', 'Haru', 'Chelsea', 'Arisu', 'Chelsea'],
    price: [1500.00, 200.10, 300.05, 350.77, 100.34, 50.00],
    discount_price: [500, 50, 0, 0, 25, 0],
    bookmarked: [false, false, false, false, false, false],
    link: ['/', '', '/', '', '', '/'],
    description: ['', '', '', '', '', '',],
});

products.images = products.images.map((image, index) => {
    const savedImage = localStorage.getItem(`uploadedImage_${index}`);
    return savedImage as string;
});

export default { products };