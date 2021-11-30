import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import registerI18n from './language/registerI18n'

const app = createApp(App)
app.use(router)
app.use(registerI18n)
app.use(Antd)
app.mount('#app')
