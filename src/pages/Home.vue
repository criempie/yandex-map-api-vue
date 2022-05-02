<template>
  <div class="page">
    <Side/>
    <Map/>
  </div>
</template>

<script>
import Map  from '@/components/Map';
import Side from '@/components/Side';
import {
  mapActions,
  mapGetters,
}           from 'vuex';

export default {
  components: {
    Map, Side,
  },
  created() {
    this.initOffices();
    this.initMap();
  },
  watch   : {
    currentCountry() {
      this.updateOffices();
    },
  },
  computed: {
    ...mapGetters({
      currentCountry: 'currentCountry',
    }),
  },
  methods : {
    ...mapActions({
      initMap      : 'map/init',
      initOffices  : 'offices/init',
      updateOffices: 'offices/updateOffices',
    }),
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  height: 100vh;
  width: 100vw;
  display: flex;
  float: left;
}
</style>