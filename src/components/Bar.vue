<template>
  <div class="bar bar-block noselect">
    <div class="bar-block" v-for="(beat, beatKey) in beats" :key="beatKey">
      <div v-for="(note, noteKey) in beat" :key="noteKey">
        <span>
          <span v-if="beatKey === 0"><strong>|--</strong></span>
          <NoteEditor v-if="isBeingEdited(beatKey,noteKey)"/><span v-else><strong v-on:click="editNote(beatKey,noteKey)">{{note}}</strong>--</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TabStore from './TabStore.js';
import NoteEditor from './NoteEditor.vue'

export default {
  name: 'Bar',
  components: {
    NoteEditor
  },
  props: {
    measureIndex: Number,
    barIndex: Number,
  },
  data: function(){
    return{
      beats: TabStore.tab.measures[this.measureIndex].bars[this.barIndex].beats,
      editing: {beatIndex : null, noteIndex : null}
    }
  },
  computed: {

  },
  methods: {
    
    editNote(beatIndex, noteIndex){
      console.log('hi');
      this.editing.beatIndex = beatIndex;
      this.editing.noteIndex = noteIndex;
    },
    isBeingEdited(beatIndex, noteIndex){
      return this.editing.beatIndex === beatIndex && this.editing.noteIndex === noteIndex;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.bar {
  font-size: 14pt;
  font-family: 'Courier New', Courier, monospace;
}

.bar-block{
  display: inline-block;
}

.bar:hover{
  background: yellowgreen;
}

.note:hover{
  background: powderblue;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

</style>
