<template>
  <div class="card-holder">
    <header class="header" @click="toggle">
      <h1 class="name">{{ officesByCity.city }}</h1>
      <ArrowIcon :class="isOpen ? 'icon_opened' : 'icon_closed'"/>
    </header>
    <main class="body"
          :class="isOpen ? '' : 'closed'"
          ref="cardHolder"
          :style="{maxHeight: isOpen ? height + 'px' : 0}">
      <Card v-for="off of officesByCity.offices"
            :name="off.name"
            :owner="off.owner"
            :phone-numbers="off.phoneNumbers"
            :email="off.email"/>
    </main>
  </div>
</template>

<script>
import ArrowIcon      from '@/components/ArrowIcon';
import Card           from '@/components/Card';
import { mapGetters } from 'vuex';

export default {
  props     : {
    officesByCity: Object,
  },
  components: {
    Card, ArrowIcon,
  },
  methods   : {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
  computed  : {
    ...mapGetters([ 'currentCountry' ]),
  },
  watch     : {
    currentCountry() {
      this.isOpen = false;
    },
  },
  data() {
    return { isOpen: false, height: 0 };
  },
  mounted() {
    this.height = this.$refs.cardHolder.scrollHeight;
  },
};
</script>

<style scoped>
.card-holder {
  padding: .5em 1em;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow: hidden;
  transition: max-height .5s ease;
}

.name {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 18px;
  line-height: 3;
  width: max-content;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header:hover {
  cursor: pointer;
}

.closed {
  max-height: 0;
  transition: max-height .5s ease;
}
</style>