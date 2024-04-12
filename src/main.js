import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import { createApp } from 'vue'
import router from './router';
import App from './App.vue'

createApp(App).use(router).mount('#app')
