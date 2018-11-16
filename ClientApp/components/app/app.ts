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
	colours: string[] = ["red", "pink", "purple", "indigo", "blue", "teal", "green", "orange"];

	mounted() {
		this.themeColour(Number(getCookie('twa-colour')));
		this.$vuetify.theme.error = "AF0E14";
		this.dark = getCookie('twa-dark') == 'true' ? true : false;
	}

	themeDark() {
		this.dark = !this.dark;
		setCookie('twa-dark', this.dark.toString());
	}

	themeColour(colour: number) {
		setCookie('twa-colour', colour.toString());
		switch (colour) {
			case 0:
				this.$vuetify.theme.primary = "ED1C24";
				this.$vuetify.theme.accent = "F36368";
				break;
			case 1:
				this.$vuetify.theme.primary = "E91E63";
				this.$vuetify.theme.accent = "FF80AB";
				break;
			case 2:
				this.$vuetify.theme.primary = "9C27B0";
				this.$vuetify.theme.accent = "EA80FC";
				break;
			case 3:
				this.$vuetify.theme.primary = "3F51B5";
				this.$vuetify.theme.accent = "8C9EFF";
				break;
			case 4:
				this.$vuetify.theme.primary = "2196F3";
				this.$vuetify.theme.accent = "82B1FF";
				break;
			case 5:
				this.$vuetify.theme.primary = "009688";
				this.$vuetify.theme.accent = "A7FFEB";
				break;
			case 6:
				this.$vuetify.theme.primary = "4CAF50";
				this.$vuetify.theme.accent = "B9F6CA";
				break;
			case 7:
				this.$vuetify.theme.primary = "FF9800";
				this.$vuetify.theme.accent = "FFD180";
				break;
		}
	}
}
