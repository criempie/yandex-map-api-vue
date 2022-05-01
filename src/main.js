import { createApp } from 'vue';
import Home      from './pages/Home.vue';
import { store } from '@/store';

createApp(Home)
    .use(store)
    .mount('#app');
