<template>
  <div class="side">
    <Tabs @selectedTab="setCountry" :tabs="tabs"/>
  </div>
</template>

<script>
import Tabs           from '@/components/Tabs';
import {
  RUSSIA,
  BELARUS,
}                     from '@/store';
import { mapActions } from 'vuex';

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
    Tabs,
  },
  methods: {
    ...mapActions({
      setCountry: 'country',
    })
  },
  data() {
    return { tabs };
  },
};
</script>

<style scoped>
.side {
  width: 30%;
  min-width: 250px;
  max-width: 400px;
  z-index: 2;

  -webkit-box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
  -moz-box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
  box-shadow: 4px 0px 12px 0px rgba(50, 50, 50, 0.52);
}
</style>