<template>
  <div>
    <card v-if="user.login">
      <div id="header">
        <div id="avatar">
          <avatar :src="user.picture.thumbnail"></avatar>
        </div>
        <div id="divider">
          <divider vertical/>
        </div>
        <div id="map">
          <MapContainer :latitude="getLatitude" :longitude="getLongitude"></MapContainer>
        </div>
        <div id="divider">
          <divider vertical/>
        </div>
        <div id="starIcon">
          <icon @onClick="activeFavourite" :color="showColorFavourite" value="mdi-star-outline" />
        </div>
      </div>
      <divider/>
      <div id="personal-data">
        Datos personales: {{user.name.first}} {{user.name.last}}, {{user.email}}
      </div>
      <divider/>
      <div id="personal-data">
        Datos de localización: {{user.location.city}}, {{user.location.street.street}}, {{user.phone}} - {{user.cell}}
      </div>
    
    </card>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import {GET_USER_BY_UUID} from '@/store/getters/getterTypes'
  import MapContainer from './MapContainer'
  import Avatar from './BasicComponents/Avatar'
  import Divider from './BasicComponents/Divider.vue'
  import Card from './BasicComponents/Card.vue'
  import Icon from './BasicComponents/Icon.vue'
  export default {
    name: 'userDetail',
    components: {
      MapContainer,
      Avatar,
      Divider,
      Card,
      Icon
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
      this.uuid = this.$route.params.uuid
      var response = await axios.get(`http://localhost:5000/users/${this.uuid}`)
      this.user = response.data
      this.active = this.user.favorite
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
