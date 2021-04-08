<template>
  <div class="vm">
    <div id="map" class="map-x"></div>
    <div
      class="popup"
      ref="popup"
      v-show="currentCoordinate"
    >
      <span class="icon-close" @click="onClosePopup">✖</span>
      <div class="content">{{currentCoordinate}}</div>
    </div>
  </div>
</template>
 
<script>
import { initMap, closePopup, createOverlay, setCoordinates } from '../utils/initMap'
 
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
      this.overlay = createOverlay(this.$refs.popup)
      this.map = initMap('map', this.overlay, this.longitude, this.latitude)
      setCoordinates(this.overlay, this.longitude, this.latitude)
      this.currentCoordinate = [this.longitude, this.latitude]
    },
    onClosePopup () {
      closePopup(this.overlay)
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