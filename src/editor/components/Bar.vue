<template>
  <div id="bar" class="bar-block">
    <svg width="250" height="224">
      <defs>
        <filter x="0" y="0" width="1" height="1" id="note-bg">
          <feFlood flood-color="white"/>
          <feComposite in="SourceGraphic"/>
        </filter>
      </defs>
      <g>
        <line x1="0" y1="32" x2="0" y2="192" stroke="black"/>
        <g v-for="(string, stringKey) in tuning" :key="string">
          <line x1="0" :y1="32+stringKey*32" x2="250" :y2="32+stringKey*32" stroke="black"/>
        </g>
        <g v-for="(beat, beatKey) in beats" :key="beatKey">
          <text filter="url(#note-bg)" class="note" v-for="(note, noteKey) in beat" :key="noteKey" alignment-baseline="middle" :x="(200/beats.length)*beatKey+(200/beats.length)" :y="32+noteKey*32">{{note}}</text>
        </g>
        <line x1="250" y1="32" x2="250" y2="192" stroke="black"/>
      </g>
    </svg>
  </div>
</template>

<script>
/* eslint-disable */
import TabStore from "../../tabStore.js";
import EventBus from "../../eventBus.js";
import ChangeMarshal from "../changeMarshal.js";

export default {
  name: "Bar",
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
input {
  border: 1px;
  border-color: white;
  font-size: 14pt;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}

.note {
  font-family: "Courier New", Courier, monospace;
  font-size: 14pt;
  background: white;
  font-weight: bold;
}
</style>
