<template>
  <span class="bar" >
    <span v-for="(note, noteKey) in beats[0]" :key="noteKey">
      <span v-for="(beat, beatKey) in beats" :key="beatKey">
        {{ beats[beatKey][noteKey] }}
      </span>|
    </span>
  </span>
</template>

<script>
export default {
  name: 'Bar',
  props: {
      beats: undefined
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
