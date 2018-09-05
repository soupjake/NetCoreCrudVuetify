import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Employee } from '../../models/employee';

@Component
export default class FetchEmployeeComponent extends Vue {
  employees: Employee[] = [];

	mounted() {
		this.loadEmployees();
	}

	loadEmployees() {
		fetch('api/Employee/GetEmployees')
			.then(response => response.json() as Promise<Employee[]>)
			.then(data => {
				this.employees = data;
			});
	}
	
	createEmployee() {
		this.$router.push("/createemployee");
	}

	editEmployee(id: number) {
		this.$router.push("/editemployee/" + id);
	}

	deleteEmployee(id: number) {
		var ans = confirm("Do you want to delete Employee " + id + "?");
		if (ans) {
			fetch('api/Employee/Delete?id=' + id, {
				method: 'DELETE'
			})
				.then(response => response.json() as Promise<number>)
				.then(data => {
					if (data < 1) {
						alert("Failed to delete employee. Please make sure you are still connected.");
					} else {
						this.loadEmployees();
					}
				})
		}
	}
}
