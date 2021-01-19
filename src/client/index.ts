import 'fomantic-ui/dist/semantic.min.css';
import * as $ from 'jquery';
(<any>window).jQuery = $;
import 'fomantic-ui';
import 'reflect-metadata'

import App from '@/components/app.vue';
import router from './routes/index';

new App({
	router,
	el: 'app'
});