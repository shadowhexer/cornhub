import { computed, reactive } from "vue";
import API from '@/services/api'

type Products = {
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
}

type Catogories = {
    category: string[],
}

const products = reactive<Products>({
    names: ['Yellow Corn that goes hard when boiled etc etc etc blah blah blajdsfkhsjdk', 'Blue Seeds', 'Green Corn', 'Red Pops', 'Orange Corn', 'Green Corns',],
    images: ['', '', '', '', '', '',],
    store: ['Arisu Corn Mill', 'Haru Corn Shop', 'Haru Corn Shop', 'Chelsea', 'Arisu Corn Mill', 'Chelsea'],
    price: [1500.00, 200.10, 300.05, 350.77, 100.34, 50.00],
    discount: [50, 100, 0, 47, 25, 0],
    finalPrice: [],
    category: [],
    bookmarked: [false, false, false, false, false, false],
    dateAdded: [],
    link: ['/', '', '/', '', '', '/'],
    description: ['', '', '', '', '', '',],
});

const response = await API.get('/api/categories')
if(response.status === 200) {
    for (let i = 0; i < response.data.length; i++) {
        products.category[i] = response.data[i].name
    }
}

const categories = reactive<Catogories>({
    category: ['Staple Products', 'Instant Snacks', 'Cooking Essentials', 'Canned/Preserved', 'Specialty/Organic', 'Farming Products', 'Farming Tools', 'Miscellaneous'],
})

// Backend function to calculate the final price of each product
const finalCalc = products.price.map((price, index) => {
    if (products.discount[index] > 0) {
        const calc = Number(price)
            - (Number(price) * (Number(products.discount[index]) / 100));
        // Ensure the result is rounded to two decimal places
        return Math.round(calc * 100) / 100;
    }
    return price; // Return the original price if no discount
});

// Filter out any undefined values that might result from items without a discount
const finalPrices = finalCalc.filter(price => price !== undefined);

// Push the final prices to products.finalPrice
products.finalPrice = [...products.finalPrice, ...finalPrices];


products.images = products.images.map((image, index) => {
    const savedImage = localStorage.getItem(`uploadedImage_${index}`);
    return savedImage as string;
});

export default { products, categories };