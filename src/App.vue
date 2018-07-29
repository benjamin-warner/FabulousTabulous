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
          EventBus.$emit('undo');
        }
      }
      if (evt.ctrlKey && evt.keyCode === 90) {
          alert("Ctrl-Z");
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
