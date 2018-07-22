<template>
  <div>
    <span v-if="editing"><input type="text" maxlength="3" size="3" v-model="changeStack[changeStack.length-1]" v-on:keyup.enter="addChange"></span>
    <span v-else-if="dirty" v-on:click="edit">{{ changeStack[changeStack.length-1] }}</span>
    <span v-else v-on:click="edit">{{noteData}}</span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Note',
  props: {
      noteData: undefined
  },
  data: function(){
    return{
        editing: false,
        dirty: false,
        changeStack: []
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
