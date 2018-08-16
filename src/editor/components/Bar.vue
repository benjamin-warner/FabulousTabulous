<template>
  <svg id="bar" width="360" height="145" :x="xPos" :y="yPos">
    <line x1="0" y1="10" x2="0" y2="135" style="stroke: black; stroke-width: 2;"/>
    <BeatComponent v-for="(beat, beatIndex) in beatsOfBar(id)" :key="beatIndex" :id="beat.id" :beatIndex="beatIndex"/>
    <line x1="360" y1="10" x2="360" y2="135" style="stroke: black; stroke-width: 2;"/>
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
    index: Number,
  },
  computed: {
    ...mapGetters('editor', [
      'beatsOfBar',
    ]),
    xPos(){
      return this.index%4*360;
    },
    yPos(){
      return Math.floor(this.index/4)*145;
    }
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
