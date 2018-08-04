<template>
  <div class="tab">
    <div v-for="(measure, measureKey) in measures" :key="measureKey">
      <div class="measure-block">
        <div>
          <button v-on:click="insertNewMeasure(measureKey)">+</button>
        </div>
        <div>
          <button v-if="measureCount > 1" v-on:click="deleteMeasure(measureKey)">x</button>
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
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Tab',
  components: {
    MeasureComponent
  },
  computed: {
    ...mapState('tab', [
      'measures',
    ]),
    ...mapGetters('tab',[
      'measureCount'
    ])
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
    ...mapMutations('tab',[
      'deleteMeasure',
      'addMeasure',
      'addBar'
    ]),
    insertNewMeasure(index){
      this.addMeasure(index);
      for(let i = 0; i < 4; i++){
        this.addBar({
          toMeasure: index,
          atIndex: i
        });
      }
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
