<template>
  <div class="measure">
    <table>
      <tbody>
        <tr>
          <td v-for="(bar, strum) in tab.bars" :key="strum">
            <BarComponent :beats="bar.beats"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BarComponent from "./Bar.vue";

export default {
  name: "Measure",
  components: {
    BarComponent
  },
  data: function() {
    return {
      tab: {
        bars: [
          {
            beats: [
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
          },
          {
            beats: [
              [
                '8',
                '9',
                '10',
                '11',
              ],
              [
                '12',
                '13',
                '14',
                '15'
              ]
            ]
          },
          {
            beats: [
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
          },
          {
            beats: [
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
