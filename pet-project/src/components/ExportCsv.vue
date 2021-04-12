<template>
    <div>
        <card id="card">
			<div id="personalData" v-for="user in users" :key="user.uuid">
				{{user.gender}}, {{user.name.first}} {{user.name.last}}, {{user.nat}}, {{user.dob.date}}, {{user.registered.date}}
			</div>
			<divider />
			<div id="exportButtonContainer">
				<basic-button color="#00BB91" name="Export Data" @onClick="exportCsv"></basic-button>
			</div>
        </card>
   </div>
</template>

<script>
import Divider from './BasicComponents/Divider.vue'
import Card from './BasicComponents/Card.vue'
import BasicButton from '../components/BasicComponents/BasicButton.vue';
import { exportToCsv } from '@/utils/exportToCsv'
import { mapActions } from 'vuex';
import { GET_FAVOURITE_USERS } from '@/store/actions/actionTypes'
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
		...mapActions({
			getFavouriteUsers: GET_FAVOURITE_USERS,
		}),
		exportCsv() {
			let rows = [
				["gender", "name", "nationality", "birthDate", "registerDate"] 
			]
			this.users.forEach(user => rows.push([user.gender, user.name.first + " " + user.name.last, user.nat, user.dob.date, user.registered.date]))
			exportToCsv.execute(rows)
		}
	},
	created() {
		this.getFavouriteUsers().then(response => this.users = response)
	}
}
</script>

<style scoped>
#personalData {
	padding: 16px;
}

#card {
	margin-top: 48px;
}

#exportButtonContainer {
	display: flex;
	justify-content: flex-end;
	padding: 16px;
}
</style>