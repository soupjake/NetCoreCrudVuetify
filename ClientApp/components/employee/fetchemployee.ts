import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Employee } from '../../models/employee';

@Component
export default class FetchEmployeeComponent extends Vue {
  employees: Employee[] = [];
	loading: boolean = false;
	failed: boolean = false;
	dialog: boolean = false;
	search: string = "";
	selected: number = 0;
	headers: object[] = [
		{ text: 'Id', value: 'id' },
		{ text: 'Name', value: 'name' },
		{ text: 'Role', value: 'role' },
		{ text: 'Skill', value: 'skill' },
	];

	mounted() {
		this.loadEmployees();
	}

	loadEmployees() {
		this.loading = true;
		fetch('api/Employee/GetEmployees')
			.then(response => response.json() as Promise<Employee[]>)
			.then(data => {
				this.employees = data;
				this.loading = false;
			});
	}
	
	createEmployee() {
		this.$router.push("/createemployee");
	}

	editEmployee(id: number) {
		this.$router.push("/editemployee/" + id);
	}

	openDelete(selected: number) {
		this.selected = selected;
		this.dialog = true;
	}

	deleteEmployee() {
		this.failed = false;
		this.dialog = false;
		fetch('api/Employee/Delete?id=' + this.selected, {
			method: 'DELETE'
		})
			.then(response => response.json() as Promise<number>)
			.then(data => {
				if (data < 1) {
					this.failed = true;
				} else {
					this.loadEmployees();
				}
			})
	}
}
