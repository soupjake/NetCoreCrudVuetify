import './css/site.css';
import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

Vue.use(VueRouter);
Vue.use(Vuetify);

const routes = [
    { path: '/', component: require('./components/home/home.vue.html').default },
    { path: '/fetchemployee', component: require('./components/employee/fetchemployee.vue.html').default },
    { path: '/createemployee', component: require('./components/employee/createemployee.vue.html').default },
    { path: '/editemployee/:id', component: require('./components/employee/editemployee.vue.html').default }
];

new Vue({
	el: '#app-root',
	router: new VueRouter({ mode: 'history', routes: routes }),
	render: h => h(
		require('./components/app/app.vue.html').default
	),
});
