import {RouteConfig, Route} from 'vue-router/types';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Create from './create.vue';
import Read from './read.vue';
import Hash from './hash.vue';
import * as kebab from 'kebab-case'

const routes: RouteConfig[] = [];

const components = {Create, Read, Hash};
for(let comp in components) {
	let name = kebab(comp),
		component = components[comp];
	if(name[0] === '-') name = name.substr(1);
	let route: RouteConfig = {
		path: `/${name}`,
		name,
		component
	};
	if(component.params) {
		route.path += '/:' + component.params.join('/:');
		route.props = true
	}
	routes.unshift(route);
}
const router = new VueRouter({
	mode: 'history',
	routes
});
export default router;