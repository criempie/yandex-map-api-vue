<template>
  <div class="card">
    <h2 class="name">
      Офис {{ office.name }}
      <img src="@/assets/map.svg"
           alt="map"
           class="icon icon_24 clickable" @click="showOnMap"/>
    </h2>
    <span class="row">{{ office.owner }}</span>
    <div class="phoneNumbers">
      <span v-for="number of office.phoneNumbers" class="number">
        {{ number }}
      </span>
    </div>
    <span class="email">{{ office.email }}</span>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  props: {
    office: Object,
  },

  computed: {
    ...mapGetters({
      mapZoom: 'map/zoom',
    }),
  },

  methods: {
    ...mapActions({
      setCenter        : 'map/setCenter',
      setBounds        : 'map/setBounds'
    }),

    async showOnMap() {
      this.setCenter({
        coords: this.office.coords,
      });

      this.office.getPlacemark()
          .balloon
          .open(this.office.coords);
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
}

.name {
  color: var(--secondary-color);
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row {

}

.email {
  color: var(--email-color);
}

.phoneNumbers {
  display: flex;
  gap: .5em;
}
</style>