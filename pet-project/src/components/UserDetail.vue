<template>
  <div>
    <v-card v-if="user.login">
    <div id="header">
      <div id="avatar">
        <v-avatar>
          <v-img :src="user.picture.thumbnail" />
        </v-avatar>
      </div>
      <div id="divider">
        <v-divider vertical></v-divider>
      </div>
      <div id="map">
        <MapContainer :latitude="getLatitude" :longitude="getLongitude"></MapContainer>
      </div>
      <div id="divider">
        <v-divider vertical></v-divider>
      </div>
      <div id="starIcon">
        <v-icon @click="activeFavourite" :color="showColorFavourite"> mdi-star-outline </v-icon>
      </div>
    </div>
    <v-divider></v-divider>
    <div id="personal-data">
      Datos personales: {{user.name.first}} {{user.name.last}}, {{user.email}}
    </div>
    <v-divider></v-divider>
    <div id="personal-data">
      Datos de localización: {{user.location.city}}, {{user.location.street.street}}, {{user.phone}} - {{user.cell}}
    </div>
    
  </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import {GET_USER_BY_UUID} from '@/store/getters/getterTypes'
  import MapContainer from './MapContainer'
  export default {
    name: 'userDetail',
    components: {
      MapContainer
    },
    data: () => ({
      user: {},
      uuid: '',
      active: false,
    }),
    computed: {
      ...mapGetters({
        getUserByUuid: GET_USER_BY_UUID,
      }),
      getLatitude() {
        console.log('gett')
        return parseFloat(this.user.location.coordinates.latitude)
      },
      getLongitude() {
        return parseFloat(this.user.location.coordinates.longitude)
      },
      showColorFavourite() {
        if(this.active) return 'yellow darken-3'
        return 'grey lighten-1'
      }
    },
    methods: {
      activeFavourite() {
        if(this.user.favorite) {
          this.user.favorite = false
        }else {
          this.user.favorite = true
        }
        axios.put('http://localhost:5000/users', this.user)
        this.active = this.user.favorite
      },
    },  
    async beforeCreate () {
      console.log('entra')
      this.uuid = this.$route.params.uuid
      var response = await axios.get(`http://localhost:5000/users/${this.uuid}`)
      this.user = response.data
      this.active = this.user.favorite
      console.log('sale')
    }
  }
</script>

<style scoped>
  #header{
    display: grid;
    grid-template-columns: 1fr 8px 2fr 8px 1fr;
  }

  #starIcon, #avatar, #divider {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #personal-data {
    text-align: center;
    padding: 16px;
  }

  #map {
    height: 400px;
    margin: 0 4px;
  }
  #divider {
    margin: center;
  }
</style>
