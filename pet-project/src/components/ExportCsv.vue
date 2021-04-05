<template>
    <div>
        <v-card class="mx-auto" max-width="500">
					<div id="personalData" v-for="user in users" :key="user.uuid">
						{{user.gender}}, {{user.name.first}} {{user.name.last}}, {{user.nat}}, {{user.dob.date}}, {{user.registered.date}}
					</div>
					<v-divider></v-divider>
					<v-btn>
						<div @click="exportCsv">
							exportDataIntoCsv
						</div>
					</v-btn>
        </v-card>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ExportCsv',
	data() {
		return {
			users: []
		}
	},
	methods: {
		exportCsv() {
			let rows = [
				["gender", "name", "nationality", "birthDate", "registerDate"] 
			]
			
			this.users.forEach(user => rows.push([user.gender, user.name.first + " " + user.name.last, user.nat, user.dob.date, user.registered.date]))
			let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "users_data.csv");
			document.body.appendChild(link);
			link.click();
		}
	},
	created() {
		axios.get('http://localhost:5000/favouriteUsers').then(response => this.users = response.data)
	}
}
</script>

<style scoped>
#personalData {
	padding: 16px;
}
</style>