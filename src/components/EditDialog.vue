<script setup lang="ts">
import { computed, reactive, ref, watch, type Ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload, mdiClose, mdiDeleteOutline, mdiCheckBold } from '@mdi/js';
import API from '@/services/api';
import UserForms from './Scripts/UserProfile';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/services/Session'
import Products from './Scripts/Products';
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const products = Products.products;

const check = ref<boolean>();

const props = defineProps<{
    index: number,
    toggle: {
        toggle: (index: number) => void,
        dialog: { [key: number]: boolean }
    },
    categories: { category: string[] },
    id: number,
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileOuput = ref<string>('')

const fileSelection = reactive({
    // Create a reference to the file input

    triggerFileInput() {
        if (fileInput.value) {
            fileInput.value.click();
        }
    },

    onFileSelected(event: Event, index: number){
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
                editForms.formPush.imageUrl = fileOuput.value = base64Image;

            };
            reader.readAsDataURL(file); // Convert to Base64 if needed
        }
    },

});


const editForms = reactive({

    formPush: reactive({
        imageUrl: products.images[props.index],
        name: products.names[props.index],
        price: products.price[props.index],
        discount: products.discount[props.index],
        description: products.description[props.index],
        store: user?.value?.name,
        categories: products.category[props.index],
    }),

    async submit(index: number) {
        await API.get('/sanctum/csrf-cookie').then(async () => {
            const response = await API.put(`/api/product/edit/${props.id}`, {
                name: this.formPush.name,
                price: this.formPush.price,
                discount: this.formPush.discount,
                description: this.formPush.description,
                store: this.formPush.store,
                category: this.formPush.categories,
                imageUrl: this.formPush.imageUrl,
            })

            if (response.status === 200) {
                (document.getElementById('form') as HTMLFormElement).reset();
                fileOuput.value = '';

                console.log('Product added successfully');
            } else {
                console.log('Failed to add product');
            }
        });

        props.toggle.toggle(index);
    },

    async deleteProduct(index: number){
        await API.get('/sanctum/csrf-cookie').then(async () => {
            const response = await API.delete(`/api/product/delete/${props.id}`);
            if (response.status === 200) {
                console.log('Success');
            }
        });

        props.toggle.toggle(index);
    },
});


</script>

<template>
    <v-dialog v-model="props.toggle.dialog[props.index]" persistent no-click-animation>
        <v-card min-height="200" width="500" location="top center">

            <v-hover v-slot="{ isHovering, props }">
                <v-img v-bind="props" :src="products.images[index] || fileOuput" height="300"
                    cover aspect-ratio="16/9">
                    <v-overlay :model-value="!!isHovering" class="d-flex flex-row justify-center align-center"
                        @click="fileSelection.triggerFileInput" contained persistent>
                        <v-card class="d-flex align-center custom-card">
                            <svg-icon type="mdi" class="mx-2 text-white" size="30" :path="mdiUpload"></svg-icon>
                            <span class="text-h6 text-white">Upload Photo</span>

                            <input type="file" accept="image/*" ref="fileInput" class="d-none"
                                @change="fileSelection.onFileSelected($event, index)" />
                        </v-card>
                    </v-overlay>
                </v-img>
            </v-hover>

            <v-spacer class="my-5" />

            <v-form class="d-flex flex-column px-5" ref="submitForm" id="form">

                <v-text-field v-model="editForms.formPush.name" :placeholder="products.names[index]" width="450"
                    label="Product Name" variant="outlined" />

                <v-combobox v-model="editForms.formPush.categories" :placeholder="products.category[index]"
                    auto-select-first="exact" width="215" label="Categories" variant="outlined" validate-on="submit"
                    :items="products.category" />

                <div class="d-flex flex-row justify-space-between">

                    <v-text-field v-model="editForms.formPush.price" :placeholder="products.price[index].toString()"
                        width="215" label="Price" variant="filled"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />

                    <v-text-field v-model="editForms.formPush.discount" :disabled="check"
                        :placeholder="String(products.discount[index])" class="ml-5" width="215"
                        label="Discount Percentage" variant="filled"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />
                </div>

                <v-textarea v-model="editForms.formPush.description" :placeholder="products.description[index]"
                    width="450" density="compact" variant="outlined" label="Description" auto-grow></v-textarea>

            </v-form>

            <div class="my-3">
                <v-btn :prepend-icon="mdiCheckBold" text="Done" variant="flat" base-color="green" rounded="0"
                    @click="editForms.submit(props.id)" width="400" location="bottom center" flat />
            </div>

            <div class="mb-4">
                <v-btn :prepend-icon="mdiDeleteOutline" text="Delete" variant="flat" base-color="error" rounded="0"
                    @click.prevent="editForms.deleteProduct(index)" width="400" location="bottom center" flat />
            </div>

            <div class="mb-4">
                <v-btn :prepend-icon="mdiClose" class="text-subtitle-2" text="Close" variant="text" rounded="0"
                    @click.prevent="props.toggle.toggle(index)" width="100" location="bottom center" :ripple="false" flat />
            </div>

        </v-card>
    </v-dialog>
</template>
<style scoped>
.custom-card {
    background-color: transparent !important;
    /* Ensures no background */
    box-shadow: none !important;
    /* Removes any shadow, if any */
}

.custom-card:hover {
    background-color: transparent !important;
    /* Prevents hover effect */
}

/* ::v-deep(.v-label) {
    opacity: 1 !important;
} */
</style>