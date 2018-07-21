<template>
  <div class="string">
        <b>{{tuning}}|
        <span v-for="(bar, barKey) in bars" :key="barKey">
        <span v-for="(note, noteKey) in bar.notes" :key="noteKey">{{note}}--</span>|--</span></b>
  </div>
</template>

<script>
export default {
  name: 'String',
  props: {
      tuning: '',
      bars: undefined,
      annotation: false
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
