<template>
  <div id="editor">
    <TabComponent/>
  </div>
</template>

<script>
import TabComponent from './components/Tab.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Editor',
  components: {
    TabComponent,
  },
  computed: {
    ...mapGetters('tab',['canUndo', 'canRedo'])
  },
  created() {
    document.addEventListener('keydown', this.onKeyPress);
  },
  destroyed() {
    document.removeEventListener('keydown', this.onKeyPress);
  },
  methods: {
    ...mapActions('tab', ['undo', 'redo']),
    onKeyPress(evt){
      // Because Steve Jobs.
      if (navigator.appVersion.indexOf("Mac")!=-1){
        // Cmd + Z
        if (evt.metaKey && evt.keyCode === 90) {
          evt.preventDefault();
          if(this.canUndo){
            this.undo();
          }
        }
        // Cmd + Y
        else if(evt.metaKey && evt.keyCode === 89){
          evt.preventDefault();
          if(this.canRedo){
            this.redo();
          }
        }
      }
      // Ctrl Z - undo
      if (evt.ctrlKey && evt.keyCode === 90) {
        evt.preventDefault();
        if(this.canUndo){
          this.undo();
        }
      }
      // Ctrl Y - redo
      else if(evt.ctrlKey && evt.keyCode === 89){
        evt.preventDefault();
        if(this.canRedo){
          this.redo();
        }
      }
    }
  }
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
