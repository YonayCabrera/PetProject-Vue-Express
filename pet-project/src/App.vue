<template>
  <v-app>
    <v-main>
    <app-bar> 
      <div id="appBar">
        <v-btn text fab color="#F1F3F5">
          <icon @onClick="goToInitialPage" value="dashboard" />
        </v-btn>
        <v-btn text fab color="#F1F3F5">
          <icon @onClick="exportToCsv" value="download" />
        </v-btn>
      </div>
    </app-bar> 
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Icon from '@/components/BasicComponents/Icon.vue';
import AppBar from '@/components/BasicComponents/AppBar.vue';
export default {
  name: 'App',
  components: {
    AppBar,
    Icon
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

<style scoped>
#appBar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
