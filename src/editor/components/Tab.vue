<template>
  <svg id="tab" width="100%" :height="tabHeight" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <g v-for="(barId, barIndex) in barList" :key="barIndex">
      <g v-if="barIndex%2 === 0" v-for="(string, stringIndex) in tuning" :key="string">
        <rect v-if="barIndex === barList.length - 1" x="0" :y="staffPos(barIndex)+stringIndex*25+10" width="360" height="1" style="fill: black"/>
        <rect v-else x="0" :y="staffPos(barIndex)+stringIndex*25+10" width="720" height="1" style="fill: black"/>
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
      return Math.ceil(this.barList.length/2)*145;
    }
  },
  methods: {
    staffPos(index){
      return Math.floor(index/2)*145;
    },
    sectionWidth(index){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-block{
  display: inline-block;
}
</style>
