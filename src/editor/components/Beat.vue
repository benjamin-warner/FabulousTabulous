<template>
  <g id="beat">
    <g v-for="(note, index) in notesOfBeat(id)" :key="index">
      <NoteComponent :id="note.id" :xPosition="xIndex" :yPosition="index"/>
    </g>
  </g>
</template>

<script>
import NoteComponent from './Note.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Beat',
  components: {
    NoteComponent
  },
  props: {
    id: String,
    xIndex: Number
  },
  computed: {
    ...mapGetters('editor', [
      'notesOfBeat',
    ])
  }
};
</script>

<style scoped>
.tab-text {
  font-family: "Roboto Mono";
  font-size: 10pt;
  font-weight: bold;
  pointer-events: none;
  text-anchor: middle;
  fill: black;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
