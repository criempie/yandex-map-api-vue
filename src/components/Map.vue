<template>
  <div id="map" class="map"></div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  methods: {
    ...mapActions({
      update: 'map/updateMap',
    }),
  },

  computed: {
    ...mapGetters({
      coords: 'coords',
    }),
  },

  watch: {
    coords() {
      this.update();
    }
  },

};
</script>

<style>
.map {
  height: 100%;
  width: 70%;
}
</style>