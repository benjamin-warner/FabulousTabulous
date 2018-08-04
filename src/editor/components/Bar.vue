<template>
  <div id="bar" class="bar-block" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <div :class="{hidden: !hovered}">
      <Button v-on:click="deleteSelf">X</Button>
    </div>
    <svg width="320" height="145">
      <g>
        <rect x="0" y="10" width="1" height="125" :class="{hover: hovered}" style="fill: black"/>
        <g v-for="(string, stringIndex) in tuning" :key="string">
          <rect x="0" :y="stringY(stringIndex)" width="320" height="1" :class="{hover: hovered}" style="fill: black"/>
        </g>
        <BeatComponent v-for="(beat, beatKey) in getBeats(id)" :key="beatKey" :id="beatKey" :parentId="id"/>
        <rect x="320" y="10" width="1" height="125" :class="{hover: hovered}" style="fill: black"/>
      </g>
    </svg>
    <svg width="4" height="145" v-if="isLast">
      <rect x="0" y="10" width="4" height="126" style="fill: black"/>
    </svg>
  </div>
</template>

<script>
/* eslint-disable */
import EventBus from '../../eventBus.js'
import BeatComponent from './Beat.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: "Bar",
  components: {
    BeatComponent
  },
  props: {
    id: String,
    beats: undefined
  },
  computed: {
    ...mapState('tab', ['tuning']),
    ...mapGetters('tab', ['getBeats', 'isLastBar']),
    isLast(){
      let measureId = this.$parent.revealId();
      return this.isLastBar({
        measureId: measureId, 
        barId:this.id
      });
    }
  },
  data: function() {
    return {
      hovered: false
    };
  },
  methods: {
    ...mapMutations('tab',['deleteBar']),
    stringY(index){
      return index*25+10
    },
    onHover(state){
      this.hovered = state;
    },
    deleteSelf(){
      let measureId = this.$parent.revealId();
      this.deleteBar({
        measureId: measureId,
        barId: this.id
      })
    }
  }
};
</script>

<style scoped>
#bar{
  padding-top: 4px;
}

.hidden{
  visibility: hidden;
}

.hover{
  stroke-width: 2;
  stroke: aqua;
  stroke-opacity: 0.5;
}
</style>
