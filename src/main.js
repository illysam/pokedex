import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createApp(App)
  .use(store)
  .mount('#app')
