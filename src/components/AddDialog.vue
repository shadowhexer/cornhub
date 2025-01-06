<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload, mdiClose, mdiDeleteOutline, mdiCheckBold } from '@mdi/js';
import API from '@/services/api';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/services/Session'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const check = ref<boolean>();
const fileInput = ref<HTMLInputElement | null>(null);
const fileOuput = ref<string>();

const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const props = defineProps<{
    dialog: { dialog: boolean },
    toggle: () => void,
    categories: string[],
}>();

function fileSelection() {
    // Create a reference to the file input

    const onFileSelected = (event: Event) => {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files[0]) {
            const file = input.files[0];
            console.log('Selected file:', file);

            // Validate file size (e.g., limit to 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                alert('File size exceeds the limit of 5MB.');
                return;
            }

            // Convert the file to Base64
            const reader = new FileReader();

            reader.onload = () => {
                const base64Image = reader.result as string;

                // Update the image URL to show it on the card
                imageUrl.value = fileOuput.value = base64Image;

            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };

            reader.readAsDataURL(file);
        }
    };
    return { triggerFileInput, onFileSelected }

};

const name = ref();
const price = ref();
const discount = ref();
const description = ref();
const categories = ref();
const imageUrl = ref();

function addForm() {
    const submit = async () => {
        await API.get('/sanctum/csrf-cookie').then(async () => {
            const response = await API.post('/api/product/submit', JSON.stringify({
                name: name.value,
                price: parseFloat(price.value),
                discount: parseFloat(discount.value),
                description: description.value,
                store: user?.value?.id,
                category: 1,
                imageUrl: 'onlycorn.com/corn.png',
            }));

            if (response.status === 200) {
                (document.getElementById('form') as HTMLFormElement).reset();
                fileOuput.value = '';
                console.log('Product added successfully');
            } else {
                console.log('Failed to add product');
            }
        });
        props.toggle();
    };

    return { price, discount, submit };
};

</script>

<template>
    <v-dialog v-model="props.dialog.dialog" persistent no-click-animation>
        <v-card min-height="200" width="500" location="top center">

            <v-hover v-slot="{ isHovering, props }">
                <v-img v-bind="props" :src="fileOuput" height="300" cover aspect-ratio="16/9">
                    <v-overlay :model-value="!!isHovering" class="d-flex flex-row justify-center align-center"
                        @click="triggerFileInput" contained persistent>
                        <v-card class="d-flex align-center custom-card">
                            <svg-icon type="mdi" class="mx-2 text-white" size="30" :path="mdiUpload"></svg-icon>
                            <span class="text-h6 text-white">Upload Photo</span>

                            <input type="file" accept="image/*" ref="fileInput" class="d-none"
                                @change="fileSelection().onFileSelected($event)" />
                        </v-card>
                    </v-overlay>
                </v-img>
            </v-hover>

            <v-spacer class="my-5" />

            <v-form class="d-flex flex-column px-5" ref="submitForm" id="form">

                <v-text-field v-model="name" width="450" label="Product Name" variant="outlined" />

                <v-combobox v-model="categories" auto-select-first="exact" width="215" label="Categories"
                    variant="outlined" validate-on="submit" :items="props.categories" />

                <div class="d-flex flex-row justify-space-between">

                    <v-text-field v-model="price" width="215" label="Price" variant="filled"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />

                    <v-text-field v-model="discount" :disabled="check" class="ml-5" width="215"
                        label="Discount Percentage" variant="filled"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />
                </div>

                <v-textarea v-model="description" width="450" density="compact" variant="outlined" label="Description"
                    auto-grow></v-textarea>

            </v-form>

            <div class="my-3">
                <v-btn :prepend-icon="mdiCheckBold" text="Done" variant="flat" base-color="green" rounded="0"
                    @click="addForm().submit()" width="400" location="bottom center" flat />
            </div>

            <div class="mb-4">
                <v-btn :prepend-icon="mdiClose" class="text-subtitle-2" text="Close" variant="text" rounded="0"
                    @click.prevent="props.toggle()" width="100" location="bottom center" :ripple="false" flat />
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