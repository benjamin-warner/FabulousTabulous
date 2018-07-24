<template>
  <div class="measure">
    {{index}}
    <div class="tuning">
      <div v-for="(tune, tuneKey) in tuning" :key="tuneKey">
        <strong>{{tune}}</strong>
      </div>
    </div>
    <span v-for="(bar, barKey) in bars" :key="barKey">
      <BarComponent :index="barKey"/>
    </span>
  </div>
</template>

<script>
import BarComponent from './Bar.vue';
import TabStore from './TabStore.js';

export default {
  name: 'Measure',
  props: {
    index: Number
  },
  components: {
    BarComponent
  },
  created: function(){
    this.tuning = TabStore.getTuning();
    this.bars = TabStore.getBars(0);
  },
  data: function() {
    return {
      tuning: undefined,
      bars: undefined
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
