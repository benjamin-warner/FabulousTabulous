<template>
  <svg width="320" height="145">
    <rect x="0" y="10" width="1" height="125" style="fill: black"/>
    <g v-for="(string, stringIndex) in tuning" :key="string">
      <rect x="0" :y="stringIndex*25+10" width="320" height="1" style="fill: black"/>
    </g>
    <BeatComponent v-for="(beat, beatIndex) in beatsOfBar(id)" :key="beatIndex" :id="beat.id" :xIndex="beatIndex"/>
    <rect x="319" y="10" width="1" height="125" style="fill: black"/>
  </svg>
</template>

<script>
import BeatComponent from './Beat.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Bar',
  components: {
    BeatComponent
  },
  props: {
    id: String,
  },
  computed: {
    ...mapGetters('editor', [
      'beatsOfBar',
      'isLastBar',
      'tuning'
      ]),
  },
  data: function() {
    return {
      hovered: false
    };
  }
}
</script>

<style scoped>
#bar{
  padding-top: 4px;
  white-space:nowrap;
}

.hover{
  stroke-width: 2;
  stroke: aqua;
  stroke-opacity: 0.5;
}
</style>
