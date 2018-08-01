<template>
  <g id="note" v-on:click="edit" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <rect :x="xPos-9" :y="yPos-9" width="18" height="18" rx="5" ry="5" :class="{hover: hovering}" :style="opacity" :fill="rectColor"/>
    <text text-anchor="middle" class="tab-text" :fill="textColor" alignment-baseline="middle" :x="xPos" :y="yPos">{{note}}</text>
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
      note: TabStore.tab.measures[this.measureIndex].bars[this.barIndex].beats[this.beatIndex][this.noteIndex],
      editing: false,
      hovering: false
    };
  },
  computed:{
    xPos(){
      return 64*this.beatIndex+64;
    },
    yPos(){
      return 25*this.noteIndex+10;
    },
    rectColor(){
      if(this.editing){
        return 'aqua';
      }
      return 'white';
    },
    textColor(){
      if(this.editing){
        return 'white';
      }
      return 'black';
    },      
    opacity(){
      if(this.note.length === 0 && !this.editing){
        return 'fill-opacity: 0.00'
      }
      return 'fill-opacity: 1'
    }
  },
  methods: {
    edit(){
      this.editing = !this.editing;
    },
    onHover(state){
      this.hovering = state;
    }
  }
};
</script>

<style scoped>
.hover {
  stroke-width: 2;
  stroke: aqua;
  stroke-opacity: 0.5;
}

.tab-text {
  font-family: 'Roboto Mono';
  font-size: 10pt;
  background: white;
  font-weight: bold;

  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>
