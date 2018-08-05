<template>
  <g @click.meta.exact="toggleMultiEdit" @click.ctrl.exact="toggleMultiEdit" @click.exact="toggleSingleEdit" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <rect id="note-rect" :x="rectX" :y="rectY" width="18" height="18" rx="5" ry="5" :style="rectOpacity" :class="{hover: hovering}" :fill="rectColor"/>
    <text id="note-text" text-anchor="middle" class="tab-text" :fill="textColor" alignment-baseline="middle" :x="textX" :y="textY">{{ note }}</text>
  </g>
</template>

<script>
/* eslint-disable */
import EventBus from '../../eventBus.js'
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "Note",
  props: {
    index: Number,
    parentId: String
  },
  mounted(){
    let self = this;
    EventBus.$on('clear-editing-flags', this.disableEditing)
    EventBus.$on('numerical-keypress', (number) => self.editNote(number));
    EventBus.$on('delete-keypress', this.onBackspace);
    EventBus.$on('mouse-click', (target) => self.handleClick(target));
  },
  data: function() {
    return {
      editing: false,
      hovering: false
    };
  },
  computed:{
    ...mapGetters('tab',[
      'noteOfChord',
      'beatIndex'
    ]),
    textX(){
      return 64*this.$parent.revealIndex()+64;
    },
    textY(){
      return 25*this.index+10;
    },
    rectX(){
      return 64*this.$parent.revealIndex()+64 -9;
    },
    rectY(){
      return 25*this.index+10 -9;
    },
    rectColor(){
      if(this.editing){
        return 'aqua';
      }
      return 'white';
    },
    rectOpacity(){
      if(this.note.length === 0 && !this.editing){
        return 'fill-opacity: 0.00'
      }
      return 'fill-opacity: 1'
    },
    textColor(){
      if(this.editing){
        return 'white';
      }
      return 'black';
    },
    note(){
      return this.noteOfChord({parentId: this.parentId, noteIndex: this.index});
    }
  },
  methods: {
    ...mapMutations('tab',[
      'backspaceNote',
      'appendNote'
    ]),
    onHover(state){
      this.hovering = state;
    },
    toggleMultiEdit(){
      this.editing = !this.editing;
    },
    toggleSingleEdit(){
      EventBus.$emit('clear-editing-flags');
      this.editing = true;
    },
    editNote(numberInput){
      if(this.editing && this.note.length < 2){
        this.appendNote({parentId: this.parentId, noteIndex: this.index, input: numberInput});
      }
    },
    onBackspace(){
      if(this.editing && this.note.length > 0){
        this.backspaceNote({parentId: this.parentId, noteIndex: this.index})
      }
    },
    handleClick(target){
      if(target.id !== 'note-text' && target.id !== 'note-rect'){
        this.editing = false;
      }
    },
    disableEditing(){
      this.editing = false;
    }    
  }
};
</script>

<style scoped>

.hover {
  stroke-width: 2;
  stroke: aqua;
  stroke-opacity: 0.5;
}

.tab-text {
  font-family: 'Roboto Mono';
  font-size: 10pt;
  background: white;
  font-weight: bold;

  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>
