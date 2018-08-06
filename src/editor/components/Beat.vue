<template>
  <g id="beat">
    <NoteComponent v-for="(note, noteKey) in notesOfBeat(id)" :key="noteKey" :id="note.id" :yIndex="noteKey"/>
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
  props: {
    id: String,
  },
  computed: {
    ...mapGetters('tab', [
      'notesOfBeat',
      'indexOfBeat'
    ]),
  },
  methods: {
    revealIndex(){
      let barId = this.$parent.revealId();
      return this.indexOfBeat({ barId: barId, beatId: this.id});
    }
  }
};
</script>

<style scoped>

</style>
