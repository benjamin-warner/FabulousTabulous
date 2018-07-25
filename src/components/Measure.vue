<template>
  <div class="measure">
    <div class="tuning">
      <div v-for="(tune, tuneKey) in tuning" :key="tuneKey">
        <strong>{{tune}}</strong>
      </div>
    </div>
    <div class="bar-block" v-for="(bar, barKey) in bars" :key="barKey">
      <div>Bar {{barKey}}</div>
      <BarComponent :measureIndex="measureIndex" :barIndex="barKey"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BarComponent from './Bar.vue';
import TabStore from './TabStore.js';

export default {
  name: 'Measure',
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tuning {
  display: inline-block;
}

.bar-block{
  display: inline-block;
}

.measure {
  font-size: 14pt;
  font-family: 'Courier New', Courier, monospace;
}

</style>
