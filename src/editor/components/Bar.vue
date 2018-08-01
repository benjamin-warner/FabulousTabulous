<template>
  <div id="bar" class="bar-block" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <div :class="{hidden: !hovered}">
      <Button v-on:click="removeSelf">X</Button>
    </div>
    <svg width="320" height="145">
      <g>
        <rect x="1" y="10" width="1" height="125" :class="{hover: hovered}" style="fill: black"/>
        <g v-for="(string, stringKey) in tuning" :key="string">
          <rect x="0" :y="stringKey*25+10" width="320" height="1" :class="{hover: hovered}" style="fill: black"/>
        </g>
        <BeatComponent v-for="(beat, beatKey) in beats" :measureIndex="measureIndex" :barIndex="barIndex" :beatIndex="beatKey" :key="beatKey"/>
        <rect x="319" y="10" width="1" height="125" :class="{hover: hovered}" style="fill: black"/>
      </g>
    </svg>
  </div>
</template>

<script>
/* eslint-disable */
import TabStore from '../../tabStore.js';
import EventBus from '../../eventBus.js';
import ChangeMarshal from '../changeMarshal.js';
import BeatComponent from './Beat.vue';

export default {
  name: "Bar",
  components: {
    BeatComponent
  },
  props: {
    measureIndex: Number,
    barIndex: Number,
    tuning: undefined
  },
  data: function() {
    return {
      beats: TabStore.tab.measures[this.measureIndex].bars[this.barIndex].beats,
      hovered: false
    };
  },
  mounted() {
    EventBus.$on("nav-up", this.saveAndMove);
    EventBus.$on("nav-down");
    EventBus.$on("nav-left");
    EventBus.$on("nav-right");
  },
  methods: {
    changeNote(beatIndex, noteIndex, change) {
      ChangeMarshal.updateValue(this.beats[beatIndex], noteIndex, change);
    },
    onHover(state){
      this.hovered = state;
    },
    removeSelf(){
      this.$parent.deleteBar(this.barIndex);
    }
  }
};
</script>

<style scoped>
#bar{
  padding-top: 4px;
}

.hidden{
  visibility: hidden;
}

.hover{
  stroke-width: 2;
  stroke: aqua;
  stroke-opacity: 0.5;
}

</style>
