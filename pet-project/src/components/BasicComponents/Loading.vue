<template>
  <div>
    <div
      :class="isBlocked ? 'blocked-loader' : ''"
    />
    <v-progress-circular
      v-if="visible"
      id="progress-circular"
      :color="color"
      class="centered-loader"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#001392'
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.centered-loader {
  position: fixed;
  right: 50%;
  top: 50%;
  z-index: 9001;
}
.blocked-loader {
  background-color: '#F1F3F5';
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  z-index: 9000;
  opacity: 0.5;
}
</style>
