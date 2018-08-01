<template>
  <div id="measure">
    <div class="measure measure-block" v-for="(bar, barKey) in bars" :key="bar.id">
      <BarComponent :measureIndex="measureIndex" :barIndex="barKey" :tuning="tuning"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BarComponent from "./Bar.vue";
import TabStore from "../../tabStore.js";
import ChangeMarshal from "../changeMarshal.js";

export default {
  name: "Measure",
  props: {
    measureIndex: Number
  },
  components: {
    BarComponent
  },
  data: function() {
    return {
      tuning: TabStore.tab.tuning,
      bars: TabStore.tab.measures[this.measureIndex].bars
    };
  },
  computed: {
    measureNotFull() {
      return this.bars.length < 4;
    },
    measureEmpty() {
      return this.bars.length === 0;
    }
  },
  methods: {
    deleteBar(bar) {
      ChangeMarshal.removeValue(this.bars, bar);
    },
    insertBarAt(index) {
      var newBar = {};
      newBar.beats = [];
      for (var i = 0; i < 4; i++) {
        newBar.beats.push(['','','','','','']);
      }
      newBar.id = +new Date();
      ChangeMarshal.addValue(this.bars, index, newBar);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#measure{
  display: table;
}

.measure-text{
  font-family: 'Roboto Mono';
  font-size: 10pt;
  
  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.measure-block {
  display: table-cell;
  vertical-align: middle;
}
</style>
