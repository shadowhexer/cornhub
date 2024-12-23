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

// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const cornTheme = {
    colors: {
        background: '#FFE57F'
    }
}

const app = createApp(App)
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

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string || 'Page Not Found -  OnlyCorn';
    next();
});

app.use(vuetify).use(router).mount('#app')
