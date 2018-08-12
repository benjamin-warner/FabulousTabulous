<template>
  <g id="beat">
    <g v-for="(note, yIndex) in notesOfBeat(id)" :key="yIndex" @click.exact="selectSingle(note.id)" 
    @click.ctrl.exact="selectMulti(note.id)" @click.meta.exact="selectMulti(note.id)" 
      @mouseover="$event.target.classList.add('hovered')" @mouseout="$event.target.classList.remove('hovered')">
      <rect :x="64*xIndex+64-9" :y="25*yIndex+10 -9" width="18" height="18" rx="5" ry="5" fill="white" 
      v-bind:class="{ selected: isNoteSelected(note.id) }"/>
      <text :x="64*xIndex+64" :y="25*yIndex+10" class="tab-text" alignment-baseline="middle">
        {{ note.note }}
      </text>
    </g>
  </g>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import EventBus from '../../eventBus';

export default {
  name: 'Beat',
  props: {
    id: String,
    xIndex: Number
  },
  computed: {
    ...mapGetters('editor', [
      'notesOfBeat',
      'note',
      'isNoteSelected',
      'getNoteSelectionsOfBeat'
    ])
  },
  created() {
    document.addEventListener('keydown', this.onKeyPress);
  },
  destroyed() {
    document.removeEventListener('keydown', this.onKeyPress);
  },
  methods: {
    ...mapMutations('editor', [
      'selectNote', 
      'deselectNote',
      'clearNoteSelections'
    ]),
    ...mapActions('editor', ['queueNote']),
    onKeyPress(evt) {
      if(this.getNoteSelectionsOfBeat(this.id).length !== 0){
        // 0 through 9
        if (evt.keyCode >= 48 && evt.keyCode <= 57) {
          evt.preventDefault();
          let character = evt.keyCode - 48;
          this.appendSelections(character);
        }
        // backspace || delete
        if (evt.keyCode === 8 || evt.keyCode === 46) {
          evt.preventDefault();
          this.backspaceSelections();
        }
        // escape
        if (evt.keyCode === 27) {
          evt.preventDefault();
          this.clearNoteSelections();
        }
      }
    },
    selectSingle(id) {
      this.clearNoteSelections();
      this.selectNote(id);
    },
    selectMulti(id) {
      if(this.isNoteSelected(id)){
        this.deselectNote(id)        
      } else {
        this.selectNote(id);
      }
    },
    appendSelections(character) {
      let notes = this.getNoteSelectionsOfBeat(this.id)
      for(let id of notes){
        let currentNote = this.note(id).note;
        this.queueNote({ 
          mutation: 'replaceNote', 
          payload: { 
            id: id, 
            value: currentNote.length < 2 ? currentNote + character : currentNote 
          }
        });
      }
    },
    backspaceSelections(){
      let notes = this.getNoteSelectionsOfBeat(this.id)
      for(let id of notes){
        let currentNote = this.note(id).note;
        this.queueNote({ 
          mutation: 'replaceNote', 
          payload: { 
            id: id, 
            value: currentNote.length > 0 ? currentNote.slice(0, -1) : currentNote 
          }
        });
      }
    }
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

.selected {
  fill: aqua;
}

.empty {
  fill-opacity: 0;
}

.hovered {
  fill: aqua;
  fill-opacity: 1;
}
</style>
