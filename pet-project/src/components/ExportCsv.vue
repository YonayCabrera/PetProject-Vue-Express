<template>
    <div>
        <card>
			<div id="personalData" v-for="user in users" :key="user.uuid">
				{{user.gender}}, {{user.name.first}} {{user.name.last}}, {{user.nat}}, {{user.dob.date}}, {{user.registered.date}}
			</div>
			<divider />
			<basic-button name="exportDataIntoCsv" @onClick="exportCsv"></basic-button>
        </card>
   </div>
</template>

<script>
import axios from 'axios'
import Divider from './BasicComponents/Divider.vue'
import Card from './BasicComponents/Card.vue'
import BasicButton from '../components/BasicComponents/BasicButton.vue';
export default {
  name: 'ExportCsv',
	data() {
		return {
			users: []
		}
	},
	components: {
		Divider,
		Card,
		BasicButton
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