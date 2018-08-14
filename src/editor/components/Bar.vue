<template>
  <g>
    <BeatComponent v-for="(beat, beatIndex) in beatsOfBar(id)" :key="beatIndex" :id="beat.id" :xIndex="beatIndex"/>
  </g>
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
    id: String
  },
  computed: {
    ...mapGetters('editor', [
      'beatsOfBar',
      'isLastBar'
      ]),
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
