import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class HomeComponent extends Vue {
	getFill() {
		return "#" + this.$vuetify.theme.primary.toString();
	}
}
