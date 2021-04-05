<template>
  <div>
    <v-card
  >
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
        <MapContainer :geojson="geojson" v-on:select="selected = $event"></MapContainer>
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
      user: {
        picture: {},
        name: {},
        location: {street: {}}
      },
      uuid: '',
      active: false,
      geojson: {
        type: 'Feature',
        properties: {
          name: 'default object',
          quality: 'top'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [
                -27.0703125,
                43.58039085560784
              ],
              [
                -28.125,
                23.563987128451217
              ],
              [
                -10.8984375,
                32.84267363195431
              ],
              [
                -27.0703125,
                43.58039085560784
              ]
            ]
          ]
        }
      }
    }),
    computed: {
      ...mapGetters({
        getUserByUuid: GET_USER_BY_UUID,
      }),
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
    created () {
      this.uuid = this.$route.params.uuid
      axios.get(`http://localhost:5000/users/${this.uuid}`).then(response => {
        this.user = response.data
        this.active = this.user.favorite
      })
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
    height: 100px;
    margin: 0 4px;
  }
  #divider {
    margin: center;
  }
</style>
