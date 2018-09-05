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

	deleteEmployee(id: number) {
		var ans = confirm("Do you want to delete employee" + id + "?");
		if (ans) {
			fetch('api/Employee/Delete?id=' + id, {
				method: 'DELETE'
			})
				.then(response => { this.loadEmployees(); })
		}
	}
}
