import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Employee } from '../../models/employee';

@Component
export default class EditEmployeeComponent extends Vue {

	mount: boolean = false;
	employee: Employee = {
		id: 0,
		name: "",
		role: "",
		skill: ""
	}

	mounted() {
		fetch('api/Employee/GetById?id=' + this.$route.params.id)
			.then(respone => respone.json() as Promise<Employee>)
			.then(data => {
				this.employee = data;
				this.mount = true;
			});
	}

	editEmployee() {
		fetch('api/Employee/Update', {
			method: 'PUT',
			body: JSON.stringify(this.employee)
		})
			.then(response => response.json() as Promise<number>)
			.then(data => {
				if (data < 1) {
					alert("Failed to edit employee. Please make sure all fields are correct.");
				} else {
					this.$router.push('/fetchemployee');
				}
			})
	}
}