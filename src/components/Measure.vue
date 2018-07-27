<template>
  <div class="measure">
    <div class="tuning">
      <div v-for="(tune, tuneKey) in tuning" :key="tuneKey">
        <strong>{{tune}}</strong>
      </div>
    </div>
    <button v-if="measureEmpty" v-on:click="insertBarAt(0)">+</button>
    <div class="bar-block" v-for="(bar, barKey) in bars" :key="bar.id">
      <div>
        <button v-if="measureNotFull" v-on:click="insertBarAt(barKey)">+</button>
        <button v-on:click="deleteBar(bar)">X</button>
        <button v-if="measureNotFull" v-on:click="insertBarAt(barKey+1)">+</button>
      </div>
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
  },
  computed: {
    measureNotFull(){
      return this.bars.length < 4;
    },
    measureEmpty(){
      return this.bars.length === 0;
    }
  },
  methods: {
    deleteBar(bar){
      var toDelete = this.bars.indexOf(bar);
      this.bars.splice(toDelete,1);
    },
    insertBarAt(index){
      var newBar = {}
      newBar.beats = [];
      for(var i = 0; i < 4; i++){
        newBar.beats.push(['--','--','--','--','--','--']);
      }
      newBar.id = + new Date();
      this.bars.splice(index,0,newBar);
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
