<template>
  <div id="bar" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <svg width="320" height="145">
      <g>
        <rect x="0" y="10" width="1" height="125" :class="{hover: hovered}" style="fill: black"/>
        <g v-for="(string, stringIndex) in tuning" :key="string">
          <rect x="0" :y="stringY(stringIndex)" width="320" height="1" :class="{hover: hovered}" style="fill: black"/>
        </g>
        <!-- <BeatComponent v-for="(beat, beatKey) in beatsOfBar(id)" :key="beatKey" :id="beatKey" :parentId="id"/> -->
        <rect x="319" y="10" width="1" height="125" :class="{hover: hovered}" style="fill: black"/>
      </g>
    </svg>
    <svg class="end-block" width="4" height="145" v-if="isLast">
      <rect x="0" y="10" width="4" height="126" style="fill: black"/>
    </svg>
  </div>
</template>

<script>
/* eslint-disable */
import EventBus from '../../eventBus.js'
import BeatComponent from './Beat.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: "Bar",
  components: {
    BeatComponent
  },
  props: {
    id: Number,
  },
  computed: {
    ...mapState('tab', ['tuning']),
    ...mapGetters('tab', ['beatsOfBar', 'isLastBar']),
    isLast(){
      let measureId = this.$parent.revealId();
      return this.isLastBar({
        measureId: measureId, 
        barId: this.id
      });
    }
  },
  data: function() {
    return {
      hovered: false
    };
  },
  methods: {
    stringY(index){
      return index*25+10
    },
    onHover(state){
      this.hovered = state;
    },
  }
};
</script>

<style scoped>
#bar{
  padding-top: 4px;
  white-space:nowrap;
}

.hover{
  stroke-width: 2;
  stroke: aqua;
  stroke-opacity: 0.5;
}
</style>
