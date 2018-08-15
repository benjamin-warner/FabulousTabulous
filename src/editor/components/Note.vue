<template>
  <svg id="note" width="20" height="20" x="0" :y="index*25" @click.exact="selectSingle(id)"
    @click.ctrl.exact="selectMulti(id)" @click.meta.exact="selectMulti(id)" 
      @mouseover="$event.target.classList.add('hovered')" @mouseout="$event.target.classList.remove('hovered')">
    <rect x="0" y="0" width="20" height="20" rx="5" ry="5" fill="white" 
    v-bind:class="{ selected: isNoteSelected(id) }"/>
    <text x="10" y="11" class="tab-text" alignment-baseline="middle">{{ note(id).note }}</text>
  </svg>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'note',
  props: {
    id: String,
    index: Number
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
      'isNoteSelected'
    ])
  },
  methods: {
    ...mapMutations('editor', [
      'selectNote', 
      'deselectNote',
      'clearNoteSelections'
    ]),
    ...mapActions('editor', ['queueNote']),
    onKeyPress(evt) {
      if(this.isNoteSelected(this.id)){
        // 0 through 9
        if (evt.key >= 0 && evt.key <= 9) {
          evt.preventDefault();
          this.appendSelections(evt.key);
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
    appendSelections(number) {
      let currentNote = this.note(this.id).note;
      this.queueNote({  });
    },
    backspaceSelections(){
      let currentNote = this.note(this.id).note;
      this.queueNote({  });
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
