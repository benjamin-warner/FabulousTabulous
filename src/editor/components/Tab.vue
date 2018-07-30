<template>
  <div class="tab" >
    <div v-for="(measure, measureKey) in measures" :key="measure.id">
      <div class="measure-block">
        <div>
          <button v-on:click="insertNewMeasure(measureKey)">+</button>
        </div>
        <div>
          <button v-if="measures.length > 1" v-on:click="deleteMeasure(measureKey)">x</button>
        </div>
        <div>
          <button v-on:click="insertNewMeasure(measureKey+1)">+</button>
        </div>
      </div>
      <MeasureComponent class="measure-block" :measureIndex="measureKey"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MeasureComponent from './Measure.vue';
import TabStore from '../../tabStore.js';
import EventBus from '../../eventBus.js';
import ChangeMarshal from '../changeMarshal';

export default {
  name: 'Tab',
  components: {
    MeasureComponent
  },
  data: function(){
    return {
      measures: TabStore.tab.measures,
      changeStack: []
    }
  },
  mounted(){
    var self = this;
    EventBus.$on('undo', this.undo);
    EventBus.$on('redo', this.redo);
  },
  methods: {
    insertNewMeasure(index){
      var bars = []
      for(var i = 0; i < 4; i++){ //bars
        var newBar = {}
        newBar.beats = [];
        
        for(var j = 0; j < 4; j++){
          newBar.beats.push(['--','--','--','--','--','--']);
        }
        newBar.id = + new Date() + i;
        bars.push(newBar);
      }
      ChangeMarshal.addValue(this.measures, index, {bars: bars, id: + new Date()});
    },
    deleteMeasure(key){
      ChangeMarshal.removeValue(this.measures, key);
    },
    undo(){
      ChangeMarshal.undoChange();
    },
    redo(){
      ChangeMarshal.redoChange();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.measure-block{
  display: inline-block;
}

</style>
