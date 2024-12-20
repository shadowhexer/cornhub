<script setup lang="ts">
import { ref, type Ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload, mdiClose, mdiDeleteOutline, mdiCheckBold } from '@mdi/js';

const check = ref<boolean>();

const props = defineProps<{
    forms: {
        price: { price: string },
        discount: { discount: string },
        dialog: { dialog: boolean },
        index: number,
        formPush: {
            imageUrl: string,
            name: string,
            price: number,
            discount: number,
            description: string,
            categories: string,
        },
        submit: () => void,
        toggle: () => void,
    },
    fileSelect: {
        triggerFileInput: () => void;
        uploadProfile: (event: Event, index: number) => void;
        onFileSelected: (event: Event, index: number) => void;
        fileOuput: Ref<string, string>;
        fileInput: Ref;
    },
    categories: string[],
}>();

</script>

<template>
    <v-dialog v-model="forms.dialog.dialog" persistent no-click-animation>
        <v-card min-height="200" width="500" location="top center">

            <v-hover v-slot="{ isHovering, props }">
                <v-img v-bind="props" :src="fileSelect.fileOuput.value" height="300" cover aspect-ratio="16/9">
                    <v-overlay :model-value="!!isHovering" class="d-flex flex-row justify-center align-center"
                        @click="fileSelect.triggerFileInput" contained persistent>
                        <v-card class="d-flex align-center custom-card">
                            <svg-icon type="mdi" class="mx-2 text-white" size="30" :path="mdiUpload"></svg-icon>
                            <span class="text-h6 text-white">Upload Photo</span>

                            <input type="file" accept="image/*" :ref="fileSelect.fileInput" class="d-none"
                                @change="fileSelect.onFileSelected($event, forms.index)" />
                        </v-card>
                    </v-overlay>
                </v-img>
            </v-hover>

            <v-spacer class="my-5" />

            <v-form class="d-flex flex-column px-5" ref="submitForm" id="form">

                <v-text-field v-model="forms.formPush.name" width="450" label="Product Name" variant="outlined" />

                <v-combobox v-model="forms.formPush.categories" auto-select-first="exact" width="215" label="Categories"
                    variant="outlined" validate-on="submit" :items="categories" />

                <div class="d-flex flex-row justify-space-between">

                    <v-text-field v-model="forms.price.price" width="215" label="Price" variant="filled"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />

                    <v-text-field v-model="forms.discount.discount" :disabled="check" class="ml-5" width="215"
                        label="Discount Percentage" variant="filled"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />
                </div>

                <v-textarea v-model="forms.formPush.description" width="450" density="compact" variant="outlined"
                    label="Description" auto-grow></v-textarea>

            </v-form>

            <div class="my-3">
                <v-btn :prepend-icon="mdiCheckBold" text="Done" variant="flat" base-color="green" rounded="0"
                    @click="forms.submit()" width="400" location="bottom center" flat />
            </div>

            <div class="mb-4">
                <v-btn :prepend-icon="mdiClose" class="text-subtitle-2" text="Close" variant="text" rounded="0"
                    @click.prevent="forms.toggle()" width="100" location="bottom center" :ripple="false" flat />
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