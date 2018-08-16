<template>
  <svg id="bar" width="360" height="155" :x="xPos" :y="yPos" @mouseover="hovered = true" @mouseout="hovered = false">
    <rect x="0" y="0" width="360" height="155" style="opacity: 0"/>
    <rect x="0" y="0" width="360" height="10" :class="hovered ? 'show' : 'hide'" @click="queueRemoveBar(id)"/>
    <line x1="0" y1="20" x2="0" y2="145" style="stroke: black; stroke-width: 2;"/>
    <BeatComponent v-for="(beat, beatIndex) in beatsOfBar(id)" :key="beatIndex" :id="beat.id" :beatIndex="beatIndex"/>
    <line x1="360" y1="20" x2="360" y2="145" style="stroke: black; stroke-width: 2;"/>
  </svg>
</template>

<script>
import BeatComponent from './Beat.vue'
import { mapGetters, mapActions } from 'vuex'

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
  },
  methods: {
    ...mapActions('editor', ['queueRemoveBar'])
  }
}
</script>

<style scoped>
#bar{
  padding-top: 4px;
  white-space:nowrap;
}

.show{
  fill: black;
  opacity: 1;
}

.hide{
  opacity: 0;
}

.hover{
  stroke-width: 2;
  stroke: aqua;
  stroke-opacity: 0.5;
}
</style>
