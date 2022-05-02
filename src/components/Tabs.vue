<template>
  <div class="tabs-container" @click="catchBubbling">
    <Tab v-for="tab of tabs"
         :name="tab.name"
         :alias="tab.alias"
         :selected="tab.name === selected"/>
  </div>
</template>

<script>
import Tab from '@/components/Tab';

export default {
  components: {
    Tab,
  },
  props: {
    tabs: Array,
  },
  data() {
    return {
      selected: 'russia',
    };
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