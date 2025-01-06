import { computed, reactive } from "vue";
import API from '@/services/api'

type Catogories = {
    category: string[],
}

type Products = {
    product_id: number[],
    names: string[],
    price: number[],
    discount: number[],
    images: string[],
    store: string[],
    category: string[],
    description: string[],
    bookmarks: number[],
}

const products = reactive<Products>({
    product_id: [],
    names: [],
    price: [],
    discount: [],
    images: [],
    store: [],
    category: [],
    description: [],
    bookmarks: [],
});

const retrieveProducts = async () => {
    try {
        const response = await API.get('/api/products');
        if (response) {
            // Clear existing data in products
            console.log("Response: ", response.data)

            // Populate the products object with the response data
            response.data.forEach((item: { product_id: number; product_name: string; product_price: number; product_discount: number; product_image_url: string; store_name: string; product_category_name: string; product_description: string; number_of_bookmarks: number; }) => {
                products.product_id.push(item.product_id);
                products.names.push(item.product_name);
                products.price.push(item.product_price);
                products.discount.push(item.product_discount);
                products.images.push(item.product_image_url);
                products.store.push(item.store_name);
                products.category.push(item.product_category_name);
                products.description.push(item.product_description);
                products.bookmarks.push(item.number_of_bookmarks);
            });
        }
    } catch (error) {
        console.error('Error retrieving products:', error);
    }
}; retrieveProducts();

const categories = reactive<Catogories>({
    category: [],
})

const response = await API.get('/api/categories')
if(response.status === 200) {
    for (let i = 0; i < response.data.length; i++) {
        categories.category[i] = response.data[i].name
    }
}

// Backend function to calculate the final price of each product
const finalPrice = ((price: number, discount: number) => {
    if (price > 0) {
        const calc = Number(price)
            - (Number(price) * (Number(discount) / 100));
        // Ensure the result is rounded to two decimal places
        return Math.round(calc * 100) / 100;
    }
    return price; // Return the original price if no discount
});


products.images = products.images.map((image, index) => {
    const savedImage = localStorage.getItem(`uploadedImage_${index}`);
    return savedImage as string;
});

export default { products, categories, finalPrice };