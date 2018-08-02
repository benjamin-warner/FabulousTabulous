<template>
  <div id="bar" class="bar-block" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <div :class="{hidden: !hovered}">
      <!-- <Button v-on:click="insert(barIndex)"></Button>
      <Button v-on:click="removeSelf">X</Button>
      <Button v-on:click="insert(barIndex+1)"></Button> -->
    </div>
    <svg width="320" height="145">
      <g>
        <rect x="0" y="10" width="1" height="125" :class="{hover: hovered}" style="fill: black"/>
        <g v-for="(string, stringIndex) in tuning" :key="string">
          <rect x="0" :y="stringY(stringIndex)" width="320" height="1" :class="{hover: hovered}" style="fill: black"/>
        </g>
        <BeatComponent v-for="(beat, beatKey) in getBeats(id)" :position="beatKey" :id="beats[beatKey]" :key="beatKey"/>
        <rect x="320" y="10" width="1" height="125" :class="{hover: hovered}" style="fill: black"/>
      </g>
    </svg>
    <!-- <svg width="4" height="145" v-if="isLast">
      <rect x="0" y="10" width="4" height="126" style="fill: black"/>
    </svg> -->
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
    id: String,
    beats: undefined
  },
  computed: {
    ...mapState('tab', ['tuning']),
    ...mapGetters('tab', {
      getBeats: 'getBeats'
    })
  },
  data: function() {
    return {
      hovered: false
    };
  },
  mounted() {
    EventBus.$on("nav-up", this.saveAndMove);
    EventBus.$on("nav-down");
    EventBus.$on("nav-left");
    EventBus.$on("nav-right");
  },
  created(){
    console.log()
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
