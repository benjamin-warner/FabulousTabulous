<template>
  <div class="tab">
    <div v-for="(measure, measureKey) in measures" :key="measureKey">
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
      <MeasureComponent class="measure-block" :id="measureKey"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MeasureComponent from './Measure.vue'
import EventBus from '../../eventBus.js'
import { mapState } from 'vuex'

export default {
  name: 'Tab',
  components: {
    MeasureComponent
  },
  computed: {
    ...mapState('tab', {
      measures: 'measures'
    }),
  },
  data: function(){
    return {
    }
  },
  mounted(){
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
          newBar.beats.push(['','','','','','']);
        }
        newBar.id = + new Date() + i;
        bars.push(newBar);
      }
      //add...
    },
    deleteMeasure(key){
    },
    undo(){
    },
    redo(){
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
