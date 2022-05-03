<template>
  <div class="card">
    <h2 class="name">Офис {{ name }}</h2>
    <span class="row">{{ owner }}</span>
    <div class="phoneNumbers">
      <span v-for="number of phoneNumbers" class="number">
        {{ number }}
      </span>
    </div>
    <span class="email">{{ email }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name        : String,
    owner       : String,
    phoneNumbers: Array,
    email       : String,
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
  color: #32466B;
  font-weight: 600;
}

.row {

}

.email {
  color: #47BAEA;
}

.phoneNumbers {
  display: flex;
  gap: .5em;
}
</style>