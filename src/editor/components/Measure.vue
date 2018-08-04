<template>
  <div id="measure" class="measure-block">
    <div class="measure measure-block" v-for="(bar, barKey) in getBars(id)" :key="barKey">
    <div>
      <Button v-on:click="insertBar(barKey)">+</Button>      
      <Button v-on:click="removeBar(bar.id)">X</Button>
      <Button v-on:click="insertBar(barKey+1)">+</Button>
    </div>
    <BarComponent :id="bar.id" :beats="bar.beats"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BarComponent from './Bar.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "Measure",
  props: {
    id: String
  },
  components: {
    BarComponent
  },
  computed: {
    ...mapGetters('tab', {
      getBars: 'getBars'
    }),
    measureNotFull() {
      return this.bars.length < 4;
    },
    measureEmpty() {
      return this.bars.length === 0;
    }
  },
  methods: {
    ...mapMutations('tab',
      ['deleteBar','addBar']
    ),
    removeBar(index){
      this.deleteBar({
        measureId: this.id,
        barId: index
      })
    },
    insertBar(index){
      let newBar = {};
      newBar.beats = [];
      for (let i = 0; i < 4; i++) {
        newBar.beats.push(['','','','','','']);
      }
      let unixTimestamp = + new Date();
      newBar.id = unixTimestamp.toString();
      this.addBar({
        measureId: this.id,
        barId: index,
        newBar: newBar
      })
    },
    revealId(){
      return this.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.measure-text{
  font-family: 'Roboto Mono';
  font-size: 10pt;
  
  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.measure-block {
  display: inline-block;
  vertical-align: middle;
}
</style>
