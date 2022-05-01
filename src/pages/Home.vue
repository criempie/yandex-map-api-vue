<template>
  <div class="page">
    <Map />
  </div>
</template>

<script>
import Map from '@/components/Map'

export default {
  components: {
    Map
  }
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
}
</style>