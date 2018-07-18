<template>
<span>
  <table>
    <thead>
      <tr>
        <th v-for="(notes, strum) in beats.sounds" :key="strum">/</th>
      </tr>
      </thead>
    <tbody>
      <tr v-for="(note, string) in beats.sounds[0]" :key="string">
        <td v-for="(notes, strum) in beats.sounds" :key="strum">
          {{ beats.sounds[strum][string] }}
        </td>
      </tr>
    </tbody>
  </table>
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
