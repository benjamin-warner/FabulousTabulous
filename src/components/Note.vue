<template>
  <div>
    {{note}}
  </div>
</template>

<script>
/* eslint-disable */
import TabStore from './TabStore.js'

export default {
  name: 'Note',
  props: {
      measureIndex: Number,
      barIndex: Number,
      beatIndex: Number,
      noteIndex: Number
  },
  data: function(){
    return{
        editing: false,
        dirty: false,
        changeStack: [],
        note: TabStore.data.measures[this.measureIndex].bars[this.barIndex].beats[this.beatIndex][this.noteIndex]
    }
  },
  methods: {
    edit: function(){
      this.editing = !this.editing;
      if(!this.dirty){
        this.changeStack.push(this.noteData);
      }
    },
    addChange: function(){
        this.dirty = true;
        this.editing = !this.editing;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
