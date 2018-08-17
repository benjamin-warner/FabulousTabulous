<template>
  <svg id="tab" width="1440" :height="tabHeight" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <g v-for="(barId, barIndex) in barList" :key="barIndex">
      <g v-if="barIndex%4 === 0" v-for="(string, stringIndex) in tuning" :key="string">
        <rect x="0" :y="tabLinePos(barIndex)+stringIndex*25+10+10" :width="tabLineWidth(barIndex)" height="1" style="fill: black"/>
      </g>
      <BarComponent :id="barId" :index="barIndex"/>
    </g>
  </svg>
</template>

<script>
import BarComponent from './Bar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Tab',
  components: {
    BarComponent
  },
  computed: {
    ...mapGetters('editor', [
      'barList',
      'tuning'
    ]),
    tabHeight(){
      return Math.ceil(this.barList.length/4)*155;
    }
  },
  methods: {
    tabLinePos(index){
      return Math.floor(index/4)*155;
    },
    tabLineWidth(index){
      if(index >= this.barList.length - 4){
        return (this.barList.length - index) *360;
      }
      else return 4*360
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tab{
  margin: 10px;
}
.tab-block{
  display: inline-block;
}
</style>
