<template>
  <div id="measure" class="measure-block">
    <div class="measure measure-block" v-for="(bar, barKey) in barsOfMeasure(id)" :key="barKey">
    <div>
      <Button v-on:click="insertBar({parentId: id, index: barKey})">+</Button>
      <Button v-if="barCountForMeasure(id) > 1" v-on:click="deleteBar({parentId: id, index: barKey})">X</Button>
      <Button v-on:click="insertBar({parentId: id, index: barKey+1})">+</Button>
    </div>
    <BarComponent :id="bar.id"/>
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
    ...mapGetters('tab', [
     'barsOfMeasure',
     'barCountForMeasure'
    ]),
    measureNotFull() {
      return this.bars.length < 4;
    },
    measureEmpty() {
      return this.bars.length === 0;
    }
  },
  methods: {
    ...mapMutations('tab',[
      'deleteBar',
      'insertBar'
      ]),
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
