<template>
  <span class="note-editor bar-block noselect">
      <input type="text" size="2" v-model="changes" v-on:keyup.enter="addChange">
  </span>
</template>

<script>
/* eslint-disable */
import TabStore from "./TabStore.js";

export default {
  name: "NoteEditor",
  props: {
    note: String,
    noteIndex: Number,
    beatIndex: Number
  },
  data: function() {
    return {
      changes: ''
    };
  },
  created() {
    this.changes = this.note;
  },
  methods: {
    addChange(){
      console.log('emitting change')
      this.$parent.addChange(this.beatIndex, this.noteIndex, this.changes);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  font-family: "Courier New", Courier, monospace;
  font-size: 12pt;
  font-weight: bold;
  padding: 0;
  margin: 0;
}
</style>
