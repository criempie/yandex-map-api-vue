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
    this.initOffices()
        .then(() => this.initMap());
  },
  watch   : {
    currentCountry() {
      this.updateOffices()
          .then(() => this.createPointsForOffices());
    },
  },
  computed: {
    ...mapGetters({
      currentCountry: 'currentCountry',
    }),
  },
  methods : {
    ...mapActions({
      initMap               : 'map/init',
      initOffices           : 'offices/init',
      initBalloon           : 'balloon/init',
      updateOffices         : 'offices/updateOffices',
      createPointsForOffices: 'map/createPointsByOffices',
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

.icon {
  width: 16px;
  height: 16px;
  stroke: black;
}

.icon_24 {
  width: 24px;
  height: 24px;
}
</style>