<template>
  <span class="bar" >
    {{this.$parent.tab.tuning.length}}
    <span v-for="(string, stringKey) in this.$parent.tab.tuning.length" :key="stringKey"></span>
    <!-- <span v-for="(note, noteKey) in beats[0]" :key="noteKey">
      <span v-for="(beat, beatKey) in beats" :key="beatKey">
        {{ beats[beatKey][noteKey] }}
      </span>|
    </span> -->
  </span>
  <!-- <strong>|</strong>-<span class="three" v-for="(beat, beatKey) in bar.beats" :key="beatKey">-<strong>{{tab.bars[barKey].beats[beatKey][stringKey]}}</strong>-</span> -->
</template>

<script>
export default {
  name: 'Bar',
  props: {
      barData: undefined
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 48pt;
}

.string {
  font-size: 12pt;
  font-family: 'Courier New', Courier, monospace;
}

</style>
