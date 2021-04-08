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
    <loading :visible="getLoading" color="#001392" />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Icon from '@/components/BasicComponents/Icon.vue';
import AppBar from '@/components/BasicComponents/AppBar.vue';
import Loading from './components/BasicComponents/Loading.vue';
import { GET_LOADING } from '@/store/getters/getterTypes'
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components: {
    AppBar,
    Icon,
    Loading
  },
  methods: {
    goToInitialPage() {
      this.$router.push({ name: 'Index' })
    },
    exportToCsv() {
      this.$router.push({ name: 'ExportCsv' })
    }
  },
  computed: {
    ...mapGetters({
        getLoading: GET_LOADING,
      }),
  },
};
</script>

<style scoped>
#appBar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
