import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg' // required

import { createPinia } from 'pinia'
import { useAuthStore } from './services/Session'


// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const cornTheme = {
    colors: {
        background: '#FFF8E1'
    }
}

const app = createApp(App)
export const pinia = createPinia()
const vuetify = createVuetify
    ({
        components,
        directives,
        theme: {
            defaultTheme: 'cornTheme',
            themes: {
                cornTheme
            }
        },
        // required
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
    });

app.use(vuetify).use(router).use(pinia).mount('#app')