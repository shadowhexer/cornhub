import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const cornTheme = {
    colors: {
        background: '#FFF8E1'
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
})

app.use(vuetify).use(router).mount('#app')
