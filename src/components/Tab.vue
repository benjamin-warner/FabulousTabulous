<template>
  <div class="tab">
    <div v-for="(measure, measureKey) in measures" :key="measureKey">
      <MeasureComponent :measureIndex="measureKey"/>
    </div>
    <div>
      <button v-on:click="addNewTab">+</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MeasureComponent from './Measure.vue'
import TabStore from './TabStore.js'

export default {
  name: 'Tab',
  components: {
    MeasureComponent
  },
  data: function(){
    return {
      measures: TabStore.tab.measures
    }
  },
  methods: {
    addNewTab(){
      var bars = []
      for(var i = 0; i < 4; i++){ //bars
        var newBar = {}
        newBar.beats = [];
        
        for(var j = 0; j < 4; j++){
          newBar.beats.push(['--','--','--','--','--','--']);
        }
        newBar.id = + new Date();
        bars.push(newBar);
      }
      this.measures.push({bars});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
