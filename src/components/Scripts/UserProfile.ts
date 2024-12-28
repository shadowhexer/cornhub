import Products from '@/components/Scripts/Products';
import Default from '@/assets/default.png';
import { computed, reactive, ref, type ComputedRef } from 'vue';
import API from '@/services/api'

type Profile = {
    coverPhoto: string | null,
    profilePhoto: string | null,
};

type Status = {
    logged_in: ComputedRef<boolean>;
    user: {
        user_id: number;
        name: string;
        email: string;
        email_verifiedd_at: string;
        register_date: Date;
        role: string;
    };
};

const profile = reactive({
    profile: {
        coverPhoto: '',
        profilePhoto: Default,
    } as Profile
})

const isLogin = reactive<Status>({
    logged_in: '' as unknown as ComputedRef<boolean>,
    user: {
        user_id: '' as unknown as number,
        name: '',
        email: '',
        email_verifiedd_at: '',
        register_date: '' as unknown as Date,
        role: '',
    },
});

(async function check(){
    try {
        const response = await API.get('/api/verify');
        if(response.data.logged_in === true) {
            const { created_at, updated_at, ...userData } = response.data.user;
            isLogin.logged_in = response.data.logged_in;
            isLogin.user = userData;
        }

    } catch (error) {
        console.error('Session verification failed.');
        isLogin.logged_in = false;
        return;
    }
    setTimeout(check, 300000);
})();


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
                editForms().formPush.imageUrl = fileOuput.value = base64Image;

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

function editForms() {
    const price = reactive<{ price: string }>({ price: '' });
    const discount = reactive<{ discount: string }>({ discount: '' });
    const dialog = reactive<{ dialog: boolean[] }>({ dialog: [] });

    const formPush = reactive({
        imageUrl: '' as string,
        name: '' as string,
        price: 0 as number,
        discount: 0 as number,
        description: '' as string,
        categories: '' as string,
    }
    );

    const submit = (index: number) => {
        formPush.price = parseFloat(price.price);
        formPush.discount = parseFloat(discount.discount);

        if (formPush.imageUrl) Products.products.images[index] = formPush.imageUrl;
        if (formPush.name) Products.products.names[index] = formPush.name;

        if (parseFloat(price.price) > 0 && price.price !== null) Products.products.price[index] = formPush.price.valueOf();

        if (parseFloat(discount.discount) > 0 && discount.discount !== price.price)
            Products.products.discount[index] = formPush.discount.valueOf();

        if (formPush.description) Products.products.description[index] = formPush.description;

        if (formPush.categories) Products.products.category[index] = formPush.categories;

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
    };

    return { price, discount, formPush, dialog, submit, deleteProduct, toggle };
};


function addForm() {
    const price = reactive<{ price: string }>({ price: '' });
    const discount = reactive<{ discount: string }>({ discount: '' });
    const dialog = reactive<{ dialog: boolean }>({ dialog: false });
    const index = Products.products.images.length + 1;
    const date = new Date();

    const formPush = reactive({
        imageUrl: '' as string,
        name: '' as string,
        price: NaN as number,
        discount: NaN as number,
        description: '' as string,
        categories: '' as string,
    }
    );

    const submit = () => {
        formPush.price = parseFloat(price.price);
        formPush.discount = parseFloat(discount.discount);

        if (formPush.imageUrl) Products.products.images.push(formPush.imageUrl);
        if (formPush.name) Products.products.names.push(formPush.name);

        if (parseFloat(price.price) > 0 && price.price !== null) Products.products.price.push(formPush.price.valueOf());

        if (parseFloat(discount.discount) && discount.discount !== price.price)
            Products.products.discount.push(formPush.discount.valueOf());

        if (formPush.description) Products.products.description.push(formPush.description);

        if(formPush.categories) Products.products.category.push(formPush.categories);

        Products.products.dateAdded.push(date.getDate());

        (document.getElementById('form') as HTMLFormElement).reset();

        fileSelection().fileOuput.value = '';

        toggle();
    };

    const toggle = () => {
        dialog.dialog = !dialog.dialog;
    };

    return { price, discount, index, formPush, dialog, submit, toggle };
};

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const image = localStorage.getItem(`Image_${i}`);

    if (i === 0 || key as string === image) {
        profile.profile.coverPhoto = image as string;
    }
    else if (i === 1 || key as string === image) {
        profile.profile.profilePhoto = image as string;
    }
}

export default { fileSelection, editForms, addForm, Products, profile, isLogin }