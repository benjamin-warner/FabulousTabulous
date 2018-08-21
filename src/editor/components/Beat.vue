<template>
  <svg id="beat" width="20" height="145" :x="beatIndex*72+72-10" y="15">
    <NoteComponent v-for="(note, index) in notesOfBeat(id)" :key="index" :id="note.id" :index="index"/>
  </svg>
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
    beatIndex: Number
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
