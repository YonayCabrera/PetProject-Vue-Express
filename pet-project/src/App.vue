<template>
  <v-app>
    <v-main>
      <v-app-bar
      app
      color="primary"
      dark
    >
    <v-btn>
      <div @click="goToInitialPage">
        inicio
      </div>
    </v-btn>
    <v-btn>
      <div @click="exportToCsv">
        exportToCsv
      </div>
    </v-btn>
    </v-app-bar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

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
