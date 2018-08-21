<template>
  <svg id="bar" width="360" height="180" :x="xPos" :y="yPos" @mouseover="hovered = true" @mouseout="hovered = false">
    <rect x="0" y="0" width="360" height="145" style="opacity: 0"/>
    <svg x="0" y="0" width="10" height="15" :class="hovered ? 'show' : 'hide'" >
      <rect x="0" y="0" width="10" height="15" style="fill: white" @click="queueAddBar(index)"/>
      <font-awesome-icon icon="plus-circle" class="icon"/>
    </svg>
    <svg x="175" y="0" width="10" height="15" :class="hovered ? 'show' : 'hide'" >
      <rect x="0" y="0" width="10" height="15" style="fill: white" @click="queueRemoveBar(id)"/>
      <font-awesome-icon icon="trash-alt" class="icon"/>
    </svg>
    <svg x="350" y="0" width="10" height="15" :class="hovered ? 'show' : 'hide'" >
      <rect x="0" y="0" width="10" height="15" style="fill: white" @click="queueAddBar(index+1)"/>
      <font-awesome-icon icon="plus-circle" class="icon"/>
    </svg>
    <line x1="0" y1="25" x2="0" y2="150" style="stroke: black; stroke-width: 2;"/>
    <BeatComponent v-for="(beat, beatIndex) in beatsOfBar(id)" :key="beatIndex" :id="beat.id" :beatIndex="beatIndex"/>
    <line x1="360" y1="25" x2="360" y2="150" style="stroke: black; stroke-width: 2;"/>
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
      return Math.floor(this.index/4)*180;
    }
  },
  data: function() {
    return {
      hovered: false
    };
  },
  methods: {
    ...mapActions('editor', [
      'queueRemoveBar',
      'queueAddBar'
      ])
  }
}
</script>

<style scoped>
#bar{
  padding-top: 4px;
  white-space: nowrap;
}

.icon{
  pointer-events: none;
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
