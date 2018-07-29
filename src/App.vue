<template>
  <div id="app">
    <TabComponent/>
  </div>
</template>

<script>
import TabComponent from './components/Tab.vue'
import EventBus from './eventBus.js'

export default {
  name: 'app',
  components: {
    TabComponent,
  },
  mounted(){
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (navigator.appVersion.indexOf("Mac")!=-1){
        if (evt.metaKey && evt.keyCode === 90) {
          evt.preventDefault();
          EventBus.$emit('undo');
        }
        else if(evt.metaKey && evt.keyCode === 89){
          evt.preventDefault();
          EventBus.$emit('redo');
        }
      }
      if (evt.ctrlKey && evt.keyCode === 90) {
        evt.preventDefault();
        EventBus.$emit('undo');
      }
      else if(evt.ctrlKey && evt.keyCode === 89){
        evt.preventDefault();
        EventBus.$emit('redo');
      }
    };
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 36pt;
}
</style>
