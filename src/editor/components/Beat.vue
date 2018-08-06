<template>
  <g id="beat">
    <NoteComponent v-for="(note, noteKey) in notesOfBeat(id)" :key="noteKey" :id="note.id"/>
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
      return this.indexOfBeat({parentId: this.$parent.revealId(), beatId: this.id});
    }
  }
};
</script>

<style scoped>

</style>
