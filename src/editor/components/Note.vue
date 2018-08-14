<template>
  <g id="note" @click.exact="selectSingle(id)" 
    @click.ctrl.exact="selectMulti(id)" @click.meta.exact="selectMulti(id)" 
      @mouseover="$event.target.classList.add('hovered')" @mouseout="$event.target.classList.remove('hovered')">
    <rect :x="rectPosition.x" :y="rectPosition.y" width="18" height="18" rx="5" ry="5" fill="white" 
    v-bind:class="{ selected: isNoteSelected(id) }"/>
    <text :x="textPosition.x" :y="textPosition.y" class="tab-text" alignment-baseline="middle">
      {{ note(id).note }}
    </text>
  </g>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'note',
  props: {
    id: String,
    xPosition: Number,
    yPosition: Number
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
    ]),
    rectPosition(){
      return { x: 64*this.xPosition+64-9, y: 25*this.yPosition+10 -9 }
    },
    textPosition(){
      return { x: 64*this.xPosition+64, y: 25*this.yPosition+10 }
    }
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
