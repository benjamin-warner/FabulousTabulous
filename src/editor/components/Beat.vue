<template>
  <g id="beat">
    <g v-for="(note, yIndex) in notesOfBeat(id)" :key="yIndex" @click.exact="selectSingle(yIndex)" 
    @click.ctrl.exact="selectMulti(yIndex)" @click.meta.exact="selectMulti(yIndex)" 
      @mouseover="$event.target.classList.add('hovered')" @mouseout="$event.target.classList.remove('hovered')">
      <rect :x="64*xIndex+64-9" :y="25*yIndex+10 -9" width="18" height="18" rx="5" ry="5" fill="white" 
      v-bind:class="{ selected: selections[yIndex], empty: note.length === 0 && !selections[yIndex] }"/>
      <text :x="64*xIndex+64" :y="25*yIndex+10" class="tab-text" alignment-baseline="middle">
        {{ note }}
      </text>
    </g>
  </g>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
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
      'notesOfBeat',
    ]),
  },
  data() {
    return {
      selections: [false, false, false, false, false, false]
    }
  },
  created() {
    EventBus.$on('clear-selections', this.clearSelections);
    document.addEventListener('keydown', this.onKeyPress);
  },
  destroyed() {
    EventBus.$off('clear-selections', this.clearSelections);
    document.removeEventListener('keydown', this.onKeyPress);
  },
  methods: {
    ...mapMutations('tab', [
      'incrementSelections',
      'decrementSelections',
      'resetSelections'
    ]),
    ...mapActions('tab', ['queueChange']),
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
      // escape
      if(evt.keyCode === 27){
        evt.preventDefault();
        this.clearSelections();
      }
    },
    selectMulti(index){
      //if editorMode === editorstore.byNote ??
      if(this.selections[index]){
        this.$set(this.selections, index, false);
        this.decrementSelections(1);
      }
      else{
        this.$set(this.selections, index, true);
        this.incrementSelections(1);
      }
    },
    selectSingle(index){
      EventBus.$emit('clear-selections');
      this.$set(this.selections, index, true);
      this.incrementSelections(1);
    },
    clearSelections(){
      for(let index in this.selections){
        if(this.selections[index]){
          this.$set(this.selections, index, false);
          this.decrementSelections(1);
        }
      }
    },
    appendSelections(character){
      for(let index in this.selections){
        if(this.selections[index]){
          let notes = this.notesOfBeat(this.id);
          if(notes[index].length < 2){
            this.queueChange({ 
              type: 'appendNote',
              content: {
                beatId: this.id, 
                index: index, 
                value: character
              }
            });
          }
        }
      }
    },
    backspaceSelections(){
      for(let index in this.selections){
        if(this.selections[index]){
          let notes = this.notesOfBeat(this.id);
          if(notes[index].length > 0){
            this.queueChange({ 
              type: 'backspaceNote',
              content: {
                beatId: this.id,
                index: index 
              }
            });
          }
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

.hovered{
  fill: aqua;
  fill-opacity: 1;
}
</style>
