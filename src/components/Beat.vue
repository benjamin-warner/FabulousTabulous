<template>
  <div>
    <div class="beat-block">
      <div v-for="(note, noteKey) in notes" :key="noteKey">
        <span v-if="beatIndex === 0">|</span>--
      </div>
    </div>      
    <div class="beat beat-block">
      <div v-for="(note, noteKey) in notes" :key="noteKey">
        <Note :measureIndex="measureIndex" :barIndex="barIndex" :beatIndex="beatIndex" :noteIndex="noteKey"/>
      </div>
    </div>
  </div>      
</template>

<script>
/* eslint-disable */
import Note from './Note.vue';
import TabStore from './TabStore.js'

export default {
  name: 'Beat',
  components: {
    Note
  },
  props: {
    measureIndex: Number,
    barIndex: Number,
    beatIndex: Number,
  },
  data: function() {
    return {
      notes: TabStore.data.measures[this.measureIndex].bars[this.barIndex].beats[this.beatIndex]
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.beat:hover{
    background: lavender;
}

.beat-block{
    display: inline-block;
}

</style>
