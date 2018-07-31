<template>
  <span class="note-editor bar-block noselect">
      
  </span>
</template>

<script>
/* eslint-disable */
import TabStore from "../../tabStore.js";

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
    EventBus.$on('nav-up', this.saveAndMove);
    EventBus.$on('nav-down', );
    EventBus.$on('nav-left', );
    EventBus.$on('nav-right', );
  },
  created() {
    this.changes = this.note;
  },
  methods: {
    addChange(){
      this.$parent.changeNote(this.beatIndex, this.noteIndex, this.changes);
    },
    closeEditor(){
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
