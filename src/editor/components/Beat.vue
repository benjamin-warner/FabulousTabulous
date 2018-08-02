<template>
  <g id="beat">
    <NoteComponent v-for="(note, noteKey) in beat" :key="noteKey" :measureIndex="measureIndex" :barIndex="barIndex" :beatIndex="beatIndex" :noteIndex="noteKey"/>
  </g>
</template>

<script>
/* eslint-disable */
import NoteComponent from './Note.vue'

export default {
  name: "Beat",
  components:{
    NoteComponent
  },
  props: {
    measureIndex: Number,
    barIndex: Number,
    beatIndex: Number,
    tuning: undefined
  },
  data: function() {
    return {
      beat: TabStore.tab.measures[this.measureIndex].bars[this.barIndex].beats[this.beatIndex]
    };
  }
};
</script>

<style scoped>

</style>
