<template>
  <div>
    <card
  >
    <tool-bar>
      <basic-button name="showDetail" @onClick="showProfileDetails"></basic-button>
    </tool-bar>  
    <v-list
    style="max-height: 500px"
       class="overflow-y-auto">
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
      >
        <template v-for="(item, index) in itemsFiltered">
          <v-list-item :key="item.login.uuid">
            <template>
              <v-list-item-content>
                {{item.gender}}, {{item.name.first}} {{item.name.last}}, {{item.email}}, {{item.nat}}, {{item.dob.date}}, {{item.dob.age}}, {{item.registered.date}}
              </v-list-item-content>
            </template>
          </v-list-item>

          <divider v-if="index < itemsFiltered.length - 1" :key="index"/>
        </template>
      </v-list-item-group>
    </v-list>
    <divider />
    <div id="filter">
      <text-field label="filter" :value="filterValue" icon="mdi-magnify" @valueOnChange="filterList"/>
    </div>
  </card>
  </div>
</template>

<script>
import restClient from '../utils/restClient'
import { mapActions } from 'vuex';
import { FETCH_USERS } from '@/store/actions/actionTypes'
import TextField from '../components/BasicComponents/TextField.vue';
import Divider from '../components/BasicComponents/Divider.vue';
import BasicButton from '../components/BasicComponents/BasicButton.vue';
import ToolBar from '@/components/BasicComponents/ToolBar.vue';
import Card from '../components/BasicComponents/Card.vue';
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
      Card
    },
    methods: {
      filterList(value) {
        this.itemsFiltered = this.items.filter(x => {
          if(x.gender.toLowerCase().includes(value.toLowerCase()) || x.dob.age.toString().includes(value.toLowerCase()) || x.nat.toLowerCase().includes(value.toLowerCase())) return x
        })
      },
      ...mapActions({
        fetchUsers: FETCH_USERS
      }),
      showProfileDetails() {
        if(this.itemsFiltered[this.selected] != undefined) {
          var uuid = this.itemsFiltered[this.selected].login.uuid
          this.$router.push({ name: 'userDetail', params: { uuid: uuid } })
        }
      }
    },
    created () {
      restClient().get('http://localhost:5000/users').then(response => {
        if(response.data.length > 0) {
          this.items = response.data
          this.itemsFiltered = this.items
          this.fetchUsers(this.items)
        }else {
          restClient().get('https://randomuser.me/api/?results=100')
          .then((response) => {
            this.items = response.data.results
            this.itemsFiltered = this.items
            restClient().post('http://localhost:5000/users', this.itemsFiltered)
            this.fetchUsers(this.items)
          });
        }
      })
    }
  }
</script>

<style scoped>
#filter {
  margin-left: 16px;
  margin-right: 16px;
}
</style>
