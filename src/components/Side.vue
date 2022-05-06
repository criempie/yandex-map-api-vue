<template>
  <div class="side">
    <Tabs @selectedTab="setCountry" :tabs="tabs"/>
    <div class="cards">
      <CardHolder v-for="offByCity of groupedOffices"
                  :officesByCity="offByCity"/>
    </div>
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
      groupedOffices: 'offices/groupedByCity',
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

  display: flex;
  flex-direction: column;

  -webkit-box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
  -moz-box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
  box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
}

.cards {
  height: 100%;
  overflow-y: scroll;

  scrollbar-width: thin;
  scrollbar-color: var(--secondary-color) var(--primary-color);
}

.cards::-webkit-scrollbar {
  width: 4px;
}

.cards::-webkit-scrollbar-track {
  background: var(--secondary-color);
}

.cards::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 8px;
}
</style>