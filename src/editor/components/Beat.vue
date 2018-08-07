<template>
  <g id="beat">
    <g v-for="(note, yIndex) in notesOfBeat(id)" :key="yIndex" @click.exact="selectSingle(yIndex)" 
    @click.ctrl.exact="selectMulti(yIndex)" @click.meta.exact="selectMulti(yIndex)" 
      @mouseover="$event.target.classList.add('derp')" @mouseout="$event.target.classList.remove('derp')">
      <rect :x="64*xIndex+64-9" :y="25*yIndex+10 -9" width="18" height="18" rx="5" ry="5" fill="white"/>
      <text :x="64*xIndex+64" :y="25*yIndex+10" class="tab-text" text-anchor="middle" alignment-baseline="middle" fill="black">
        {{ note }}
      </text>
    </g>
  </g>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapState, mapMutations } from 'vuex'
import EventBus from '../../eventBus';

export default {
  name: "Beat",
  props: {
    id: String,
    xIndex: Number
  },
  computed: {
    ...mapState('tab', [
      'tuning'
    ]),
    ...mapGetters('tab', [
      'notesOfBeat'
    ]),
  },
  data() {
    return {
      selections: []
    }
  },
  created() {
    EventBus.$on('clear-selections', this.clearSelections);
    document.addEventListener('keydown', this.onKeyPress);
  },
  destroyed() {
    document.removeEventListener('keydown', this.onKeyPress);
  },
  methods: {
    ...mapMutations('tab', [
      'appendNote',
      'backspaceNote'
    ]),
    onKeyPress(evt) {
      // 0 through 9
      if(evt.keyCode >= 48 && evt.keyCode <= 57){
        evt.preventDefault();
        let character = evt.keyCode - 48;
        this.appendSelections(character);
      }
      // backspace || delete
      if(evt.keyCode === 8 || evt.keyCode === 46){
        evt.preventDefault();
        this.backspaceSelections();
      }
    },
    selectMulti(index){
      //if editorMode === editorstore.byNote ??
      this.selections.push(index);
    },
    selectSingle(index){
      console.log('selecting ', index)
      EventBus.$emit('clear-selections');
      this.selections.push(index);
    },
    clearSelections(){
      this.selections = [];
    },
    appendSelections(character){
      for(let index of this.selections){
        let notes = this.notesOfBeat(this.id);
        if(notes[index].length < 2){
          this.appendNote({ beatId: this.id, index: index, value: character });
        }
      }
    },
    backspaceSelections(){
      for(let index of this.selections){
        let notes = this.notesOfBeat(this.id);
        if(notes[index].length > 0){
          this.backspaceNote({ beatId: this.id, index: index });
        }
      }
    }
  }
}
</script>

<style scoped>
.tab-text {
  font-family: 'Roboto Mono';
  font-size: 10pt;
  font-weight: bold;
  pointer-events: none;

  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.derp{
  fill: aqua;
}
</style>
