<template>
  <g id="Note">
    <text text-anchor="middle" filter="url(#note-bg)" class="note" alignment-baseline="middle" :x="xPos" :y="yPos">{{note}}</text>
    <!-- <line :x1="xPos" y1="0" :x2="xPos" y2="150" stroke="black"/> -->
  </g>
</template>

<script>
/* eslint-disable */
import TabStore from '../../tabStore.js'

export default {
  name: "Note",
  props: {
    measureIndex: Number,
    barIndex: Number,
    beatIndex: Number,
    noteIndex: Number,
    tuning: undefined
  },
  data: function() {
    return {
      note: TabStore.tab.measures[this.measureIndex].bars[this.barIndex].beats[this.beatIndex][this.noteIndex]
    };
  },
  computed:{
    xPos(){
      return 48*this.beatIndex+48;
    },
    yPos(){
      return 30*this.noteIndex+10;
    }
  }
};
</script>

<style scoped>
.note {
  font-family: "Courier New", Courier, monospace;
  font-size: 14pt;
  background: white;
  font-weight: bold;
}
</style>
