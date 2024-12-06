<script setup lang="ts">
import { computed, } from 'vue';

const props = defineProps<{
    items: {
        header: string,
        btnColor: string,
        icon: string[],
        title: string[],
        subtitle?: string[],
        link: string[],
        extra?: number[],
    },
    type: "cart" | "messages" | "notif";
    markIndividual?: any;
    isRead?: boolean[];
}>();

const avatarProps = computed(() => {
    return {
        size: props.type === 'cart' ? '85' : 'default',
        rounded: props.type === 'cart' ? '0' : '50',
    }

});

const timeAgo = computed(() => {
    const now = new Date();
    return props.items.extra?.map((timestamp: number) => {
        const seconds = Math.floor((now.getTime() - timestamp) / 1000);

        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} days ago`;
        const weeks = Math.floor(days / 7);
        if (weeks < 4) return `${weeks} weeks ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} months ago`;
        const years = Math.floor(days / 365);
        return `${years} years ago`;
    });
});


</script>

<template>
    <v-menu :close-on-content-click="true">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="elevated" :elevation="0" :color="items.btnColor" size="default">
                <slot :name="'icons'" :icon="'head'" />
            </v-btn>
        </template>

        <div class="position-absolute right-0">

            <v-card min-width="350" max-height="50vh" :class="type === 'notif' || 'messages' ? 'overflow-y-auto' : ''">

                <v-list class="mx-1">
                    <v-list-item>

                        <template #title>
                            <div class="d-flex flex-row justify-space-between align-center pa-0">

                                <div class="d-flex align-center">
                                    <slot :name="'icons'" />
                                    <span class="mx-1 text-h6 font-weight-bold">{{ items.header }}</span>
                                </div>

                                <div>
                                    <slot :name="'mark'" />
                                </div>

                            </div>
                        </template>


                    </v-list-item>
                </v-list>

                <v-divider class="mx-7" opacity="0.3" />

                <v-list lines="two" class="mx-1">
                    <!-- Show "Empty..." if all products/links are empty -->
                    <v-list-item
                        v-if="items.title.length === 0 || items.title.every((item, index) => !item || !items.link[index])"
                        disabled>
                        <v-list-item-title>Empty...</v-list-item-title>
                    </v-list-item>

                    <!-- Show the valid items -->
                    <template v-for="(item, i) in items.title">
                        <v-list-item v-if="item && items.subtitle?.[i]" :key="i" :value="item"
                            @click.stop="markIndividual(i, 'messages')">

                            <template #prepend>
                                <v-avatar v-bind="avatarProps">
                                    <v-img :src="items.icon[i]" />
                                </v-avatar>
                            </template>

                            <template #title>
                                <span class="font-weight-bold">{{ items.subtitle?.[i] }}</span>
                            </template>

                            <template #subtitle>
                                <span
                                    :class="type === 'messages' && isRead?.[i] === false ? 'text-black font-weight-bold' : ''"
                                    class="d-inline-block text-truncate" style="max-width: 250px;">
                                    {{ item }}
                                </span>
                            </template>

                            <p :class="type === 'cart' ? '' : 'text-caption'">
                                {{ type === 'cart' ? items.extra?.[i] : timeAgo?.[i] }}
                            </p>

                        </v-list-item>

                        <!-- Notif -->
                        <v-list-item 
                        v-else-if="!items.subtitle?.[i]" 
                        :href="items.link[i]"    
                        :prepend-avatar="items.icon[i]" 
                        @click.stop="markIndividual(i, 'notif')"
                        >
                            <span 
                            class="truncate  text-body-2"
                            :class="type === 'notif' && isRead?.[i] === false ? 'font-weight-bold' : ''"
                            style="max-width: 250px;"
                                >
                                {{ items.title[i] }}
                            </span>

                            <p class="text-caption ">{{ timeAgo?.[i] }}</p>

                        </v-list-item>
                    </template>
                </v-list>

            </v-card>
        </div>

    </v-menu>
</template>
<style scoped>
.truncate {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    /* Change this to the desired number of lines */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
</style>
