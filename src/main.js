import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//call fontawesome
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas, far)

const app = createApp(App)
app.use(store)
app.use(router)
app.component("FontAwesomeIcons", FontAwesomeIcon)
app.mount('#app')
