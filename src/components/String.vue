<template>
  <div class="string">
        <span class="tab-staff" v-for="(note, noteKey) in notes" :key="noteKey">{{note}}-</span>
  </div>
</template>

<script>
export default {
  name: 'String',
  props: {
      notes: undefined
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 48pt;
}

.tab-staff {
  font-size: 36pt;
  font-family: 'Courier New', Courier, monospace;
}
</style>
