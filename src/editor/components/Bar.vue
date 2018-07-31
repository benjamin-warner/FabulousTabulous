<template>
  <div id="bar" class="bar-block">
    <svg width="240" height="170">
      <defs>
        <filter x="0" y="0" width="1" height="1" id="note-bg">
          <feFlood flood-color="white"/>
          <feComposite in="SourceGraphic"/>
        </filter>
      </defs>
      <g>
        <rect x="0" y="10" width="1" height="150" style="fill: black"/>
        <g v-for="(string, stringKey) in tuning" :key="string">
          <rect x="0" :y="stringKey*30+10" width="240" height="1" style="fill: black"/>
        </g>
        <BeatComponent v-for="(beat, beatKey) in beats" :measureIndex="measureIndex" :barIndex="barIndex" :beatIndex="beatKey" :key="beatKey"/>
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
      beats: TabStore.tab.measures[this.measureIndex].bars[this.barIndex].beats
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
    }
  }
};
</script>

<style scoped>

</style>
