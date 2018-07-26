<template>
  <span class="note-editor bar-block noselect">
      Hi.
  </span>
</template>

<script>
/* eslint-disable */
import TabStore from './TabStore.js';

export default {
  name: 'NoteEditor',
  props: {
    measureIndex: Number,
    barIndex: String,
  },
  data: function(){
    return{
      
    }
  },
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.bar {
  font-size: 14pt;
  font-family: 'Courier New', Courier, monospace;
}

.bar-block{
  display: inline-block;
}

.bar:hover{
  background: yellowgreen;
}

.note:hover{
  background: powderblue;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

</style>
