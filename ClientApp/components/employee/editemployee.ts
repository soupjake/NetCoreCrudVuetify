import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Employee } from '../../models/employee';

@Component
export default class EditEmployeeComponent extends Vue {
	$refs!: {
		form: HTMLFormElement
	}

	rules: object = {
		required: value => !!value || 'Required',
		number: value => /[0-9]/.test(value) || 'Value must be number e.g. "8" or "10"',
		decimal: value => /^\d+(\.\d{1,2})?$/.test(value) || 'Value must be decimal e.g. "8.0" or "7.5"'
	}

	loading: boolean = false;
	failed: boolean = false;
	employee: Employee = {
		id: 0,
		name: "",
		role: "",
		skill: ""
	}

	mounted() {
		this.loading = true;
		fetch('api/Employee/GetById?id=' + this.$route.params.id)
			.then(respone => respone.json() as Promise<Employee>)
			.then(data => {
				this.employee = data;
				this.loading = false;
			});
	}

	editEmployee() {
		this.failed = false;
		fetch('api/Employee/Update', {
			method: 'PUT',
			body: JSON.stringify(this.employee)
		})
			.then(response => response.json() as Promise<number>)
			.then(data => {
				if (data < 1) {
					this.failed = true;
				} else {
					this.$router.push('/fetchemployee');
				}
			})
	}

	cancel() {
		this.$router.push('/fetchemployee');
	}
}
