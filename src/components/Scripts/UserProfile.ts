import Products from '@/components/Scripts/Products';
import { onMounted, reactive, ref } from 'vue';

type Profile = {
    coverPhoto: string,
    profilePhoto: string,
}

const profile = reactive({
    profile: {
        coverPhoto: '',
        profilePhoto: '',
    } as Profile
})


function fileSelection() {
    // Create a reference to the file input
    const fileInput = ref<HTMLInputElement | null>(null);
    const fileOuput = ref<string>('');

    const triggerFileInput = () => {
        if (fileInput.value) {
            fileInput.value.click();
        }
    };

    const uploadProfile = (event: Event, index: number) => {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files[0]) {
            const file = input.files[0];
            console.log('Selected file:', file);

            // Optional: handle file upload logic here, like sending it to a server
            const reader = new FileReader();

            // When the file is loaded
            reader.onload = () => {
                const base64Image = reader.result as string;

                // Update the image URL to show it on the card
                if (index === 0) {
                    profile.profile.coverPhoto = base64Image
                } else { profile.profile.profilePhoto = base64Image }

                // Save to localStorage
                localStorage.setItem(`Image_${index}`, base64Image);
            };
            reader.readAsDataURL(file); // Convert to Base64 if needed
        }
    };

    const onFileSelected = (event: Event, index: number) => {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files[0]) {
            const file = input.files[0];
            console.log('Selected file:', file);

            // Optional: handle file upload logic here, like sending it to a server
            const reader = new FileReader();

            // When the file is loaded
            reader.onload = () => {
                const base64Image = reader.result as string;

                // Update the image URL to show it on the card
                userForms().formPush.imageUrl = fileOuput.value = base64Image;

                // Save to localStorage
                localStorage.setItem(`uploadedImage_${index}`, base64Image);

                console.log('File: ', localStorage.getItem(`uploadedImage_${index}`));
                console.log('File Output: ', fileOuput.value);
            };
            reader.readAsDataURL(file); // Convert to Base64 if needed
        }
    };

    return { triggerFileInput, uploadProfile, onFileSelected, fileOuput, fileInput }

};

function userForms() {
    const price = reactive<{ price: string }>({ price: '' });
    const discount = reactive<{ discount: string }>({ discount: '' });
    const dialog = reactive<{ dialog: boolean[] }>({ dialog: [] });

    const formPush = reactive({
        imageUrl: '' as string,
        name: '' as string,
        price: 0 as number,
        discount_price: 0 as number,
        description: '' as string,
    }
    );

    const submit = (index: number) => {
        formPush.price = parseFloat(price.price);
        formPush.discount_price = parseFloat(discount.discount);

        if (formPush.imageUrl) Products.products.images[index] = formPush.imageUrl;
        if (formPush.name) Products.products.names[index] = formPush.name;

        if (parseFloat(price.price) > 0 && price.price !== null) Products.products.price[index] = formPush.price.valueOf();

        if (parseFloat(discount.discount) > 0 && discount.discount !== price.price)
            Products.products.discount_price[index] = formPush.discount_price.valueOf();

        if (formPush.description) Products.products.description[index] = formPush.description;

        (document.getElementById('form') as HTMLFormElement).reset();

        fileSelection().fileOuput.value = '';

        toggle(index);
    };

    const deleteProduct = (index: number) => {
        for (const key in Products.products) {
            if (Array.isArray(Products.products[key as keyof typeof Products.products])) {
                (Products.products[key as keyof typeof Products.products] as unknown[]).splice(index, 1);
            }
        }

        toggle(index);
    };

    const toggle = (index: number) => {
        dialog.dialog[index] = !dialog.dialog[index];
        console.log(dialog.dialog[index]);
    };

    return { price, discount, formPush, dialog, submit, deleteProduct, toggle };
};

export default { fileSelection, userForms, Products, profile }