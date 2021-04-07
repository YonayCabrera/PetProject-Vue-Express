<template>
  <v-app>
    <v-main>
    <app-bar> 
    <basic-button name="inicio" @onClick="goToInitialPage"></basic-button>
    <basic-button name="exportToCsv" @onClick="exportToCsv"></basic-button>
    </app-bar> 
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import BasicButton from '@/components/BasicComponents/BasicButton.vue';
import AppBar from '@/components/BasicComponents/AppBar.vue';
export default {
  name: 'App',
  components: {
    BasicButton,
    AppBar
  },
  methods: {
    goToInitialPage() {
      this.$router.push({ name: 'Index' })
    },
    exportToCsv() {
      this.$router.push({ name: 'ExportCsv' })
    }
  }
};
</script>
