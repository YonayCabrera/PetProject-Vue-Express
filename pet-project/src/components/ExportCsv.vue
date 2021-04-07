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
import exportToCsv from '../utils/exportToCsv'
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
			exportToCsv(rows)
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