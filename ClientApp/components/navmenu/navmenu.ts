import Vue from 'vue';
import { Component } from 'vue-property-decorator';

class MenuItem {
	constructor(public title: string,
		public icon: string,
		public path: string) { };
}

@Component
export default class NavMenuComponent extends Vue {
	menuItems: MenuItem[] = [
		new MenuItem('Home', 'home', '/'),
		new MenuItem('Employee', 'people', '/fetchemployee'),
	];

}