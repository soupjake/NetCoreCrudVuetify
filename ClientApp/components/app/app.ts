import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { getCookie, setCookie } from 'tiny-cookie';


@Component({
	components: {
		MenuComponent: require('../navmenu/navmenu.vue.html').default
	}
})
export default class AppComponent extends Vue {
	drawer: boolean = false;
	dark: boolean = false;
	colours: string[] = ["red", "pink", "purple", "indigo", "blue", "teal", "green", "orange"
 ];

	mounted() {
		this.themeColour(Number(getCookie('ers-colour')));
		this.dark = JSON.parse(getCookie('ers-dark'));
	}

	themeDark() {
		this.dark = !this.dark;
		setCookie('ers-dark', this.dark);
	}

	themeColour(colour: number) {
		setCookie('ers-colour', colour);
		switch (colour) {
			case 0:
				this.$vuetify.theme.primary = "ED1C24";
				this.$vuetify.theme.secondary = "F36368";
				break;
			case 1:
				this.$vuetify.theme.primary = "E91E63";
				this.$vuetify.theme.secondary = "FF80AB";
				break;
			case 2:
				this.$vuetify.theme.primary = "9C27B0";
				this.$vuetify.theme.secondary = "EA80FC";
				break;
			case 3:
				this.$vuetify.theme.primary = "3F51B5";
				this.$vuetify.theme.secondary = "8C9EFF";
				break;
			case 4:
				this.$vuetify.theme.primary = "2196F3";
				this.$vuetify.theme.secondary = "82B1FF";
				break;
			case 5:
				this.$vuetify.theme.primary = "009688";
				this.$vuetify.theme.secondary = "A7FFEB";
				break;
			case 6:
				this.$vuetify.theme.primary = "4CAF50";
				this.$vuetify.theme.secondary = "B9F6CA";
				break;
			case 7:
				this.$vuetify.theme.primary = "FF9800";
				this.$vuetify.theme.secondary = "FFD180";
				break;
		}
	}
}
