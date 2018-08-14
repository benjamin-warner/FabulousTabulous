<template>
  <div id="app">
    <EditorComponent/>
  </div>
</template>

<script>
import EditorComponent from './editor/Editor.vue'
import EventBus from './eventBus.js'

export default {
  name: 'app',
  components: {
    EditorComponent,
  },
  mounted(){
    document.onclick= function(event) {
      let target = 'target' in event? event.target : event.srcElement;
      EventBus.$emit('mouse-click', target);
    }
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      // Shift Tab - nav left
      if(evt.shiftKey && evt.keyCode === 9){
        evt.preventDefault();
        EventBus.$emit('nav-left');
      }
      // Tab - nav right
      else if(evt.keyCode === 9){
        evt.preventDefault();
        EventBus.$emit('nav-right')
      }      
      // Shift Enter - nav up
      if(evt.shiftKey && evt.keyCode === 13){
        evt.preventDefault();
        EventBus.$emit('nav-up');
      }
      // Enter - nav down
      else if(evt.keyCode === 13){
        evt.preventDefault();
        EventBus.$emit('nav-down');
      }
    };
  },
}
</script>

<style>
html{
  height: 100%;
}
body{
  min-height: 100%;
  margin: 0;
}
#app{
  height: 100vh;
  width: 100%;
}
</style>
