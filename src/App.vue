<template>
  <div id="app">
    <EditorComponent/>
  </div>
</template>

<script>
import EditorComponent from './editor/Editor.vue'
import EventBus from './eventBus.js'
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    EditorComponent,
  },
  data(){
    return {
      excitement: '!'
    }
  },
  computed: {
    doThing(){
      return 'pomato'
    },
    ...mapState({
      test: state => state.test,
      stateAlias: 'potato',
      withExcitement(state){
        return state.test + this.excitement;
      }
    }),
  },
  methods:{
    applyExcitement(add){
      if(add){
        this.excitement += '!';
      }
      else{
        if(this.excitement.length > 0){
          this.excitement.slice(0, -1);
        }
      }
    }
  },
  mounted(){
    document.onclick= function(event) {
      let target = 'target' in event? event.target : event.srcElement;
      EventBus.$emit('mouse-click', target);
    }
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      // Because Steve Jobs.
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
      // Ctrl Z - undo
      if (evt.ctrlKey && evt.keyCode === 90) {
        evt.preventDefault();
        EventBus.$emit('undo');
      }
      // Ctrl Y - redo
      else if(evt.ctrlKey && evt.keyCode === 89){
        evt.preventDefault();
        EventBus.$emit('redo');
      }
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
      if(evt.keyCode >= 48 && evt.keyCode <= 57){
        evt.preventDefault();
        EventBus.$emit('numerical-keypress', evt.keyCode - 48);
      }
      if(evt.keyCode === 8){
        evt.preventDefault();
        EventBus.$emit('delete-keypress');
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
