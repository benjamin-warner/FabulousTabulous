<template>
  <div class="measure">
    <table>
      <tbody>
        <tr v-for="(bar, barKey) in tab.bars" :key="barKey">
          <td v-for="(beat, beatKey) in bar.beats" :key="beatKey">
            <span v-for="(note, noteKey) in beat" :key="noteKey">
              -{{tab.bars[beatKey].beats[noteKey][barKey]}}-
            </span>|
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
              '00',
              '01',
              '02',
              '03'
            ],   
            [
              '04',
              '05',
              '06',
              '07'
            ],
              [
              '01',
              '01',
              '02',
              '03'
            ],   
            [
              '04',
              '05',
              '06',
              '07'
            ]            
            ]
          },
          {
            beats: [
              [
              '11',
              '11',
              '12',
              '13'
            ],   
            [
              '14',
              '15',
              '16',
              '17'
            ],
              [
              '11',
              '11',
              '12',
              '13'
            ],   
            [
              '14',
              '15',
              '16',
              '17'
            ]
            ]
          },
          {
            beats: [
              [
              '20',
              '21',
              '22',
              '23'
            ],   
            [
              '24',
              '25',
              '26',
              '27'
            ],
            [
              '20',
              '21',
              '22',
              '23'
            ],   
            [
              '24',
              '25',
              '26',
              '27'
            ]
            ]            
          },
          {
            beats: [
              [
              '30',
              '31',
              '32',
              '33'
            ],   
            [
              '34',
              '35',
              '36',
              '37'
            ],
            [
              '30',
              '31',
              '32',
              '33'
            ],   
            [
              '34',
              '35',
              '36',
              '37'
            ]
            ],            
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

table, caption, tbody, tfoot, thead, tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
}

.annotations {
  font-size: 18pt;
  font-family: "Courier New", Courier, monospace;
}
</style>
