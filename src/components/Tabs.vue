<template>
  <div class="tabs-container" @click="catchBubbling">
    <Tab v-for="tab of tabs"
         :name="tab.name"
         :alias="tab.alias"
         :selected="tab.name === currentCountry"/>
  </div>
</template>

<script>
import Tab            from '@/components/Tab';
import { mapGetters } from 'vuex';

export default {
  components: {
    Tab,
  },
  props     : {
    tabs: Array,
  },
  computed  : {
    ...mapGetters([ 'currentCountry' ]),
  },
  data() {
    return { selected: this.currentCountry };
  },
  methods: {
    catchBubbling(event) {
      if (event.target.dataset.vType) {
        this.selected = event.target.name;
      }
    },
  },
  watch  : {
    selected(name) {
      this.$emit('selectedTab', name);
    },
  },
};
</script>

<style scoped>
.tabs-container {
  display: flex;
  width: 100%;
}
</style>