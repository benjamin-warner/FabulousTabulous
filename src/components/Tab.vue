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
import TabStore from './TabStore.js';
import EventBus from '../eventBus.js';

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
    EventBus.$on('addChange', (data) => { self.addChange(data) });
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
      this.measures.splice(index, 0, {bars, id: + new Date()});
    },
    deleteMeasure(key){
      this.measures.splice(key,1);
    },
    undo(){
      var lastChange = this.changeStack.pop();
      if(lastChange != undefined && lastChange != null){
        var location = lastChange.location;
        switch(lastChange.type){
          case 'note-replaced':
            this.measures[location.measure]
                .bars[location.bar]
                .beats[location.beat].splice(location.note, 1,  lastChange.oldState);
            break;
          case 'bar-deleted':
            this.measures[location.measure].bars.splice(location.bar,0, lastChange.oldState);
            break;
          case 'bar-added':
            this.measures[location.measure].bars.splice(location.bar,1);
            break;
          default:
            break;
        }
      }
    },
    addChange(changeData){
      this.changeStack.push(changeData);
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
