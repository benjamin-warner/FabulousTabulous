<template>
  <span class="note-editor bar-block noselect">
      <input id="note-input" type="text" size="2" v-model="changes" @blur="onFocusLost" onfocus="this.select()" v-on:keyup.enter="addChange">
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
  mounted(){
    document.getElementById("note-input").focus();
  },
  created() {
    this.changes = this.note;
  },
  methods: {
    addChange(){
      this.$parent.addChange(this.beatIndex, this.noteIndex, this.changes);
    },
    onFocusLost(){
      this.$parent.closeEditor(this.beatIndex, this.noteIndex);
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
