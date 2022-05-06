<template>
  <svg :class="inputClass"
       class="icon"
       width="200" height="113"
       viewBox="0 0 200 113"
       xmlns="http://www.w3.org/2000/svg">
    <g>
      <line y1="100" x1="100"
            y2="13" x2="13"
            stroke-linecap="round" id="svg_1"
            stroke-width="24" fill="#000"/>
      <line y1="100" x1="100"
            y2="13" x2="13"
            transform="rotate(90, 100, 100)"
            stroke-linecap="round" id="svg_2"
            stroke-width="24" fill="#000"/>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    inputClass: String,
  },
};
</script>

<style scoped>
.icon_opened {
  stroke: #FF9E00 !important;
  transform: rotate(180deg);
}

.icon_closed {
  stroke: #32466B !important;
  transform: rotate(0deg);
}
</style>