<template>
  <div>
    <card
  >
    <tool-bar>
      <basic-button name="showDetail" @onClick="showProfileDetails"></basic-button>
    </tool-bar>  
    <list :items="itemsFiltered" @selectedValue="selectedValue"/>
    <divider />
    <div id="filter">
      <text-field label="filter" :value="filterValue" icon="mdi-magnify" @valueOnChange="filterList"/>
    </div>
  </card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { FETCH_USERS, FETCH_USERS_FROM_API } from '@/store/actions/actionTypes'
import TextField from '../components/BasicComponents/TextField.vue';
import Divider from '../components/BasicComponents/Divider.vue';
import BasicButton from '../components/BasicComponents/BasicButton.vue';
import ToolBar from '@/components/BasicComponents/ToolBar.vue';
import Card from '../components/BasicComponents/Card.vue';
import List from '../components/BasicComponents/List.vue';
import {GET_USERS} from '@/store/getters/getterTypes'
import { mapGetters } from 'vuex'

  export default {
    name: 'Index',
    data: () => ({
      items: [],
      selected: undefined,
      filterValue: '',
      itemsFiltered: []
    }),
    components: {
      TextField,
      Divider,
      BasicButton,
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
      selectedValue(value){
        this.selected = value
      },
      ...mapActions({
        fetchUsers: FETCH_USERS,
        fetchUsersFromApi: FETCH_USERS_FROM_API
      }),
      showProfileDetails() {
        if(this.itemsFiltered[this.selected] != undefined) {
          var uuid = this.itemsFiltered[this.selected].login.uuid
          this.$router.push({ name: 'userDetail', params: { uuid: uuid } })
        }
      }
    },
    async created () {
      await this.fetchUsers()
      if(this.getUsers.length > 0){
        this.itemsFiltered = this.getUsers 
      }else {
        await this.fetchUsersFromApi()
        this.itemsFiltered = this.getUsers  
      }
    }
  }
</script>

<style scoped>
#filter {
  margin-left: 16px;
  margin-right: 16px;
}
</style>
