<template>
<!--  <button @click="setCountry(RUSSIA)">set russia</button>-->
<!--  <button @click="setCountry(BELARUS)">set belarus</button>-->
  <div id="map" class="map"></div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import {
  RUSSIA,
  BELARUS,
} from '@/store/modules/Map';

export default {
  data() {
    return { RUSSIA, BELARUS };
  },
  methods: {
    ...mapActions([ 'init', 'setCountry' ]),
  },

  computed: {
    ...mapGetters([ 'pointsCollection' ]),
  },

  mounted() {
    this.init();
  },

};
</script>

<style>
.map {
  height: 100%;
  width: 100%;
}
</style>