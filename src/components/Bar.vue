<template>
  <span class="bar">
    {{beats}}
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

table{
    display: inline-block;
}
</style>
