<template>
  <div class="measure">
      <table>
        <tbody>
          <tr v-for="(note, string) in tab.bars[0].sounds[0]" :key="string">
            <td v-for="(notes, strum) in tab.bars[0].sounds" :key="strum">
              {{tab.bars[0].sounds[strum][string]}}
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import StringComponent from "./String.vue";

export default {
  name: "Measure",
  components: {
    StringComponent
  },
  data: function() {
    return {
      tab: {
        bars: [
          {
            sounds:[
              [
              '0',
              '1',
              '2',
              '3'
            ],   
            [
              '4',
              '5',
              '6',
              '7'
            ]
            ]
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

h1 {
  font-size: 48pt;
}

.annotations {
  font-size: 18pt;
  font-family: "Courier New", Courier, monospace;
}
</style>
