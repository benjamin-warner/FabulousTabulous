<template>
  <g id="beat">
    <g v-for="(note, noteIndex) in notesOfBeat(id)" :key="noteIndex">
      <rect :x="64*index+64-9" :y="25*noteIndex+10 -9" width="18" height="18" rx="5" ry="5" fill="aqua"/>
      <text :x="64+64*index" :y="25*noteIndex+10" text-anchor="middle" fill="black" alignment-baseline="middle">
        {{ note }}
      </text>
    </g>
  </g>
</template>

<script>
/* eslint-disable */
import NoteComponent from './Note.vue'
import { mapGetters } from 'vuex'

export default {
  name: "Beat",
  components:{
    NoteComponent
  },
  mounted(){
    // Keystroke listeners!
  },
  destroyed(){
    // Kill the listeners!
  },
  props: {
    id: String,
    string: Number,
    index: Number
  },
  computed: {
    ...mapGetters('tab', [
      'notesOfBeat',
      'tuning'
    ]),
  },
}
</script>

<style scoped>

</style>
