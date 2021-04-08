<template>
  <div>
    <card id="card">
    <tool-bar color="#001392">
    </tool-bar>  
    <list :items="itemsFiltered" @selectedValue="showProfileDetails"/>
    <divider />
    <div id="filter">
      <text-field label="filter by gender, age or nat" :value="filterValue" icon="mdi-magnify" @valueOnChange="filterList"/>
    </div>
  </card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { FETCH_USERS, FETCH_USERS_FROM_API } from '@/store/actions/actionTypes'
import TextField from '../components/BasicComponents/TextField.vue';
import Divider from '../components/BasicComponents/Divider.vue';
import ToolBar from '@/components/BasicComponents/ToolBar.vue';
import Card from '../components/BasicComponents/Card.vue';
import List from '../components/BasicComponents/List.vue';
import {GET_USERS} from '@/store/getters/getterTypes'
import { mapGetters } from 'vuex'
  export default {
    name: 'Index',
    data: () => ({
      items: [],
      filterValue: '',
      itemsFiltered: []
    }),
    components: {
      TextField,
      Divider,
      ToolBar,
      Card,
      List
    },
    computed: {
      ...mapGetters({
        getUsers: GET_USERS,
      }),
    },  
    methods: {
      filterList(value) {
        this.itemsFiltered = this.items.filter(x => {
          if(x.gender.toLowerCase().includes(value.toLowerCase()) || x.dob.age.toString().includes(value.toLowerCase()) || x.nat.toLowerCase().includes(value.toLowerCase())) return x
        })
      },
      ...mapActions({
        fetchUsers: FETCH_USERS,
        fetchUsersFromApi: FETCH_USERS_FROM_API
      }),
      showProfileDetails(value) {
        if(this.itemsFiltered[value] != undefined) {
          var uuid = this.itemsFiltered[value].login.uuid
          this.$router.push({ name: 'userDetail', params: { uuid: uuid } })
        }
      }
    },
    async created () {
      await this.fetchUsers()
      if(this.getUsers.length > 0){
        this.items=this.getUsers
        this.itemsFiltered = this.getUsers 
      }else {
        await this.fetchUsersFromApi()
        this.items=this.getUsers
        this.itemsFiltered = this.getUsers  
      }
    }
  }
</script>

<style scoped>
#filter {
  margin: 0 16px;
}

#card {
  margin-top: 48px;
}
</style>
