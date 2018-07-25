<template>
  <div class="bar bar-block noselect">
    <div class="bar-block" v-for="(beat, beatKey) in beats" :key="beatKey">
      {{beats}}
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Beat from './Beat.vue';
import TabStore from './TabStore.js';

export default {
  name: 'Bar',
  components: {
    Beat
  },
  props: {
    measureIndex: Number,
    barIndex: Number,
  },
  data: function(){
    return{
      beats: TabStore.measures[this.measureIndex].bars[this.barIndex]
    }
  },
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
