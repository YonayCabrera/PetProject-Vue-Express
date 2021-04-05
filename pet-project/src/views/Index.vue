<template>
  <div>
    <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="pink"
      dark
    >
      <v-btn>
        <div @click="showProfileDetails">
          button
        </div>
      </v-btn>
    </v-toolbar>
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

          <v-divider
            v-if="index < itemsFiltered.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <v-divider
    ></v-divider>
    <div id="filter">
      <v-text-field
        v-model="filterValue"
        label="Filter"
        append-icon="mdi-magnify"
        @input="filterList"
        >
      </v-text-field>
    </div>
      
  </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex';
import { FETCH_USERS } from '@/store/actions/actionTypes'
  export default {
    name: 'Index',
    data: () => ({
      items: [],
      selected: undefined,
      filterValue: '',
      itemsFiltered: []
    }),
    methods: {
      filterList() {
        this.itemsFiltered = this.items.filter(x => {
          if(x.gender.toLowerCase().includes(this.filterValue.toLowerCase()) || x.dob.age.toString().includes(this.filterValue.toLowerCase()) || x.nat.toLowerCase().includes(this.filterValue.toLowerCase())) return x
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
      axios.get('http://localhost:5000/users').then(response => {
        if(response.data.length > 0) {
          this.items = response.data
          this.itemsFiltered = this.items
          this.fetchUsers(this.items)
        }else {
          axios.get('https://randomuser.me/api/?results=100')
          .then((response) => {
            this.items = response.data.results
            this.itemsFiltered = this.items
            axios.post('http://localhost:5000/users', this.itemsFiltered)
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
