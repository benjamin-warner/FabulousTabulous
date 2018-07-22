<template>
  <div>
    <div class="beat-block">
      <div v-for="(note, noteKey) in beatData" :key="noteKey">
        <span v-if="index === 0">|</span>--
      </div>
    </div>      
    <div class="beat beat-block">
      <div v-for="(note, noteKey) in beatData" :key="noteKey">
        <Note :noteData="note"/>
      </div>
    </div>
  </div>      
</template>

<script>
/* eslint-disable */
import Note from "./Note.vue";

export default {
  name: "Beat",
  components: {
    Note
  },
  props: {
    index: Number,
    beatData: undefined
  },
  data: function() {
    return {};
  },
  methods: {}
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
