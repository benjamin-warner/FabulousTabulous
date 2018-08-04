<template>
  <g id="beat">
    <g id="note" v-for="(note, noteKey) in getChord({barId: parentId, beatId: id})" :key="noteKey">
    <!-- <NoteComponent v-for="(note, noteKey) in getChord(id)" :key="noteKey" :id="noteKey"/> -->
      <rect id="note-rect" :x="rectX(noteKey)" :y="rectY(noteKey)" width="18" height="18" rx="5" ry="5" fill="white"/>
      <text id="note-text" text-anchor="middle" class="tab-text" fill="black" alignment-baseline="middle" :x="textX(noteKey)" :y="textY(noteKey)">{{note}}</text>
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
  props: {
    id: Number,
    parentId: String
  },
  computed: {
    ...mapGetters('tab', {
        getChord: 'getChord'
    }),
  },
  methods: {
    textX(index){
      return 64*this.id+64;
    },
    textY(index){
      return 25*index+10;
    },
    rectX(index){
      return 64*this.id+64 -9;
    },
    rectY(index){
      return 25*index+10 -9;
    },
  }
};
</script>

<style scoped>

</style>
