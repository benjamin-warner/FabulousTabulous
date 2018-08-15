<template>
  <svg id="bar" width="360" height="145" :x="xPos" y="0">
    <BeatComponent v-for="(beat, beatIndex) in beatsOfBar(id)" :key="beatIndex" :id="beat.id" :beatIndex="beatIndex"/>
  </svg>
</template>

<script>
import BeatComponent from './Beat.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Bar',
  components: {
    BeatComponent
  },
  props: {
    id: String,
    barIndex: Number,
    sectionIndex: Number
  },
  computed: {
    ...mapGetters('editor', [
      'beatsOfBar',
    ]),
    xPos(){
      return this.barIndex*320;
    }
  },
  data: function() {
    return {
      hovered: false
    };
  }
}
</script>

<style scoped>
#bar{
  padding-top: 4px;
  white-space:nowrap;
}

.hover{
  stroke-width: 2;
  stroke: aqua;
  stroke-opacity: 0.5;
}
</style>
