<template>
  <button class="tab"
          :class="selected && 'tab_selected'"
          :name="name"
          data-v-type="tab">
    {{ alias }}
  </button>
</template>

<script>
export default {
  props: {
    name : String,
    alias: String,
    selected: Boolean,
  },
};
</script>

<style>
.tab {
  padding: .5em 1em;
  outline: none;
  border: 1px solid #A4A4A4;
  color: #A4A4A4;
  background-color: white;
  width: 100%;
}

.tab:hover {
  cursor: pointer;
}

.tab_selected {
  background-color: #FF9E00;
  color: white;
  border: 1px solid transparent;
}
</style>