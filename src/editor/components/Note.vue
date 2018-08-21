<template>
  <svg id="note" width="20" height="20" x="0" :y="index*25" @click.exact="selectSingle(id)"
    @click.ctrl.exact="selectMulti(id)" @click.meta.exact="selectMulti(id)" 
      @mouseover="hovered = true" @mouseout="hovered = false">
    <rect x="0" y="0" width="20" height="20" rx="5" ry="5" :fill="hovered ? 'aqua' : 'white'" :opacity="opacity" 
    :class="{ selected: isNoteSelected(id) }"/>
    <text x="10" y="11" class="tab-text" alignment-baseline="middle">{{ note(id).note }}</text>
  </svg>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'note',
  props: {
    id: String,
    index: Number,
    parentHover: Boolean
  },
  created() {
    document.addEventListener('keydown', this.onKeyPress);
  },
  destroyed() {
    document.removeEventListener('keydown', this.onKeyPress);
  },
  computed: {
    ...mapGetters('editor', [
      'note',
      'isNoteSelected',
    ]),
    opacity(){
      if(this.isNoteSelected(this.id)){
        return 1;
      }
      if(this.note(this.id).note.length === 0 && !this.hovered){
        return 0;
      }
      return 1;
    }
  },
  data(){
    return {
      hovered: false
    }
  },
  methods: {
    ...mapActions('editor', [
      'queueNote',
      'dequeueNote',
      'dequeueAllNotes',
      'commitNoteChanges',
      'writeToNote'
    ]),
    onKeyPress(evt) {
      if(this.isNoteSelected(this.id)){
        if (evt.key >= 0 && evt.key <= 9) {
          evt.preventDefault();
          this.appendSelections(evt.key);
        }
        if (evt.key === 'Backspace' || evt.key === 'Delete') {
          evt.preventDefault();
          this.backspaceSelections();
        }
        if(evt.key === 'Enter'){
          evt.preventDefault();
          this.commitNoteChanges()
        }
        if (evt.key === 'Escape') {
          evt.preventDefault();
          this.dequeueNote(this.id);
        }
      }
    },
    selectSingle(id) {
      this.dequeueAllNotes();
      this.queueNote(id);
    },
    selectMulti(id) {
      if(this.isNoteSelected(id)){
        this.dequeueNote(id)        
      } else {
        this.queueNote(id);
      }
    },
    appendSelections(number) {
      let currentNote = this.note(this.id).note;
      if(currentNote.length < 2){
        this.writeToNote({ id: this.id, value: currentNote + number });
      }
    },
    backspaceSelections(){
      let currentNote = this.note(this.id).note;
      if(currentNote.length > 0){
        this.writeToNote({ id: this.id, value: currentNote.slice(0, -1) });
      }
    }
  }
}
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
  fill-opacity: 1;
}

.hovered {
  fill: aqua;
  fill-opacity: 1;
}
</style>
