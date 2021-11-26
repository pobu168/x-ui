import { createApp } from 'vue'
import App from './App.vue'
import registerI18n from './language/registerI18n'

const app = createApp(App)
app.use(registerI18n)
app.mount('#app')
