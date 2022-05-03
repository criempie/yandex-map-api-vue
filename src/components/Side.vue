<template>
  <div class="side">
    <Tabs @selectedTab="setCountry" :tabs="tabs"/>
    <CardHolder v-for="offByCity of groupedOffices"
                :officesByCity="offByCity"/>
  </div>
</template>

<script>
import Card       from '@/components/Card';
import CardHolder from '@/components/CardHolder';
import Tabs       from '@/components/Tabs';
import {
  RUSSIA,
  BELARUS,
}                 from '@/store';
import {
  mapActions,
  mapGetters,
}                 from 'vuex';

const tabs = [
  {
    name : RUSSIA,
    alias: 'Россия',
  },
  {
    name : BELARUS,
    alias: 'Беларусь',
  },
];

export default {
  components: {
    Tabs, Card, CardHolder,
  },
  methods   : {
    ...mapActions({
      setCountry: 'country',
    }),
  },
  computed  : {
    ...mapGetters({
      groupedOffices: 'offices/groupByCity',
    }),
  },
  data() {
    return { tabs };
  },
};
</script>

<style scoped>
.side {
  width: 30%;
  min-width: 270px;
  max-width: 400px;
  z-index: 2;

  -webkit-box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
  -moz-box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
  box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
}
</style>