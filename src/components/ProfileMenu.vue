<script setup lang="ts">

defineProps<{
    menu: {
        profilePic: string,
        name: string,
        type: string,
        icon: string[],
        text: string[],
        link: string[],
    }
}>()
</script>

<template>
    <v-menu :offset="[5, 0]">
        <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="text" color="white" size="default">
                <v-avatar size="large">
                    <v-img :src="menu.profilePic" aspect-ratio="1/1" cover />
                </v-avatar>
            </v-btn>
        </template>

        <v-card min-width="300">
            <v-list>
                <v-list-item :prepend-avatar="menu.profilePic" href="/profile">
                    <template #title>
                        <span class="text-h6 font-weight-bold">{{ menu.name }}</span>
                    </template>

                    <template #subtitle>
                        {{ menu.type }}
                    </template>
                </v-list-item>
            </v-list>

            <v-divider class="mx-5" opacity="0.3" />

            <v-list lines="one">
                <v-list-item v-for="(list, l) in menu.text" :key="l" :value="list"
                    :href="menu.link[l] as string | undefined">
                    <template #prepend>
                        <slot :icon="menu.icon" :index="l" />
                    </template>
                    <v-list-item-title v-text="list"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>

    </v-menu>

</template>