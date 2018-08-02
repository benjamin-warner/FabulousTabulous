<template>
  <g @click.meta.exact="toggleMultiEdit" @click.ctrl.exact="toggleMultiEdit" @click.exact="toggleSingleEdit" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <rect id="note-rect" :x="rectX" :y="rectY" width="18" height="18" rx="5" ry="5" :class="{hover: hovering}" :style="opacity" :fill="rectColor"/>
    <text id="note-text" text-anchor="middle" class="tab-text" :fill="textColor" alignment-baseline="middle" :x="textX" :y="textY">{{note}}</text>
  </g>
</template>

<script>
/* eslint-disable */
import EventBus from '../../eventBus.js'
import { mapGetters } from 'vuex';

export default {
  name: "Note",
  props: {
    id: Number
  },
  mounted(){
    let self = this;
    EventBus.$on('clear-editing-flags', this.disableEditing)
    EventBus.$on('numerical-keypress', (number) => self.editNote(number));
    EventBus.$on('delete-keypress', this.deleteNoteChar);
    EventBus.$on('mouse-click', (target) => self.handleClick(target));
  },
  data: function() {
    return {
      editing: false,
      hovering: false
    };
  },
  computed:{
    ...mapGetters('tab',{
      note: 'getNote'
    }),
    textX(){
      return 64*this.id+64;
    },
    textY(){
      return 25*this.id+10;
    },
    rectX(){
      return 64*this.id+64 -9;
    },
    rectY(){
      return 25*this.id+10 -9;
    },
    rectColor(){
      if(this.editing){
        return 'aqua';
      }
      return 'white';
    },
    textColor(){
      if(this.editing){
        return 'white';
      }
      return 'black';
    },      
    opacity(){
      if(this.note.length === 0 && !this.editing){
        return 'fill-opacity: 0.00'
      }
      return 'fill-opacity: 1'
    }
  },
  methods: {
    // toggleMultiEdit(){
    //   this.editing = !this.editing;
    // },
    // toggleSingleEdit(){
    //   EventBus.$emit('clear-editing-flags');
    //   this.editing = true;
    // },
    // onHover(state){
    //   this.hovering = state;
    // },
    // editNote(numberInput){
    //   if(this.editing && this.note.length < 2){
    //     this.note += numberInput;
    //   }
    // },
    // deleteNoteChar(){
    //   if(this.editing && this.note.length > 0){
    //     this.note = this.note.slice(0, -1);
    //   }
    // },
    // handleClick(target){
    //   if(target.id !== 'note-text' && target.id !== 'note-rect'){
    //     this.editing = false;
    //   }
    // },
    // disableEditing(){
    //   this.editing = false;
    // }
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
