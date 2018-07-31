<template>
  <div id="measure">
    <svg width="15" height="175" class="measure-block">
      <text class="measure-text" alignment-baseline="middle" v-for="(tune, tuneKey) in tuning" :key="tuneKey" x="0" :y="25*tuneKey+25" fill="black">{{tune}}</text>
    </svg>
    <div class="measure measure-block" v-for="(bar, barKey) in bars" :key="bar.id">
      <BarComponent :measureIndex="measureIndex" :barIndex="barKey" :tuning="tuning"/>
    </div>
    <svg width="4" height="170" class="measure measure-block">
      <rect x="0" y="5" width="4" height="151" style="fill: black"/>
    </svg>
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
      var indexToDelete = this.bars.indexOf(bar);
      ChangeMarshal.removeValue(this.bars, indexToDelete);
    },
    insertBarAt(index) {
      var newBar = {};
      newBar.beats = [];
      for (var i = 0; i < 4; i++) {
        newBar.beats.push(["--", "--", "--", "--", "--", "--"]);
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
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.measure-block {
  display: table-cell;
  vertical-align: middle;
}
</style>
