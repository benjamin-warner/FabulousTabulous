<template>
  <div class="tab">
    <div v-for="(measure, measureKey) in measures" :key="measureKey">
      <div class="measure-block">
        <div>
          <button v-on:click="addMeasure(measureKey)">+</button>
        </div>
        <div>
          <button v-if="measureCount > 1" v-on:click="deleteMeasure(measure.id)">x</button>
        </div>
        <div>
          <button v-on:click="addMeasure(measureKey+1)">+</button>
        </div>
      </div>
      <MeasureComponent class="measure-block" :id="measure.id"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MeasureComponent from './Measure.vue'
import EventBus from '../../eventBus.js'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Tab',
  components: {
    MeasureComponent
  },
  computed: {
    ...mapGetters('tab', [
      'measures',
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
      'addMeasure',
      'deleteMeasure'
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.measure-block{
  display: inline-block;
}

</style>
