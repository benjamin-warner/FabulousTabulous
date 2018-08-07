<template>
  <div id="measure" class="measure-block">
    <div class="measure measure-block" v-for="(bar, barKey) in barsOfMeasure(id)" :key="barKey">
      <div id="bar-control">
        <Button v-if="barCountForMeasure(id) < 4" v-on:click="addBar({parentId: id, index: barKey})">+</Button>
        <Button v-if="barCountForMeasure(id) > 1" v-on:click="deleteBar(bar.id)">X</Button>
        <Button v-if="barCountForMeasure(id) < 4" v-on:click="addBar({parentId: id, index: barKey+1})">+</Button>
      </div>
      <BarComponent :id="bar.id" class="measure-block" />
      <svg v-if="isLastBar(bar.id)" width="4" height="145" class="measure-block" >
        <rect x="0" y="10" width="4" height="126" style="fill: black"/>
      </svg>
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
     'barCountForMeasure',
     'isLastBar'
    ]),
  },
  methods: {
    ...mapMutations('tab',[
      'deleteBar',
      'addBar'
    ])
  }
}
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
