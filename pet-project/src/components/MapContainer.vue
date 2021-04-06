<template>
  <div class="vm">
    <div id="map" class="map-x"></div>
    <div
      class="popup"
      ref="popup"
      v-show="currentCoordinate"
    >
      <span class="icon-close" @click="closePopup">✖</span>
      <div class="content">{{currentCoordinate}}</div>
    </div>
  </div>
</template>
 
<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { toStringHDMS } from 'ol/coordinate'
import { toLonLat } from 'ol/proj'
import Overlay from 'ol/Overlay'
 
export default {
  name: 'MapContainer',
  data () {
    return {
      map: null,
      currentCoordinate: null,
      overlay: null
    }
  },
  props: {
    latitude: {type: Number, default: 0},
    longitude: {type: Number, default: 0}
  },
  methods: {
    initMap () {
      this.overlay = new Overlay({
                 element: this.$refs.popup,
                 autoPan: true
      })
      console.log(this.longitude, this.latitude)
      this.map = new Map({
        target: 'map',
        layers: [
          new Tile({
            source: new OSM()
          })
        ],
        overlays: [this.overlay],
        view: new View({
          center: [this.latitude, this.longitude],
          zoom: 6
        })
      })
      const coordinate = [this.latitude, this.longitude]
      const hdms = toStringHDMS(toLonLat(coordinate))
      this.currentCoordinate = hdms
      console.log('currentCoordinate', this.currentCoordinate)
      setTimeout(() => {
        this.overlay.setPosition(coordinate)
      }, 0)
    },
    closePopup () {
      this.overlay.setPosition(undefined)
      this.currentCoordinate = null
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>
 
<style lang="scss" scoped>
  .popup {
    min-width: 280px;
    position: relative;
    background: #fff;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, calc(-100% - 12px));
 
    &::after {
      display: block;
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      border: 12px solid transparent;
      border-top-color: #fff;
      bottom: -23px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .icon-close {
    cursor: pointer;
    align-self: flex-end;
    margin-bottom: 10px;
  }

  canvas {
    height: 100%;
  }
</style>