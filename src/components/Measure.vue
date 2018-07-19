<template>
  <div class="measure">
    <table>
      <tbody>
        <tr v-for="(string, stringKey) in tab.strings" :key="stringKey">{{string}}
          <td v-for="(note, noteKey) in tab.strings" :key="noteKey">
            |-<span v-for="(beat, beatKey) in tab.bars" :key="beatKey">-{{tab.bars[beatKey].beats[beatKey][stringKey]}}-</span>-
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- {{tab.bars[stringKey].beats[noteKey][barKey]}} -->
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
        strings:[
          'e',
          'B',
          'G',
          'D',
          'A',
          'E'
        ],
        bars: [
          {
            beats: [
              [
              '00',
              '01',
              '02',
              '03',
              '09',
              '09'
            ],   
            [
              '04',
              '05',
              '06',
              '07',
              '09',
              '09'
            ],
              [
              '01',
              '01',
              '02',
              '03',
              '09',
              '09'
            ],   
            [
              '04',
              '05',
              '06',
              '07',
              '09',
              '09'
            ]            
            ]
          },
          {
            beats: [
              [
              '11',
              '11',
              '12',
              '13',
              '09',
              '09'
            ],   
            [
              '14',
              '15',
              '16',
              '17',
              '09',
              '09'
            ],
              [
              '11',
              '11',
              '12',
              '13',
              '09',
              '09'
            ],   
            [
              '14',
              '15',
              '16',
              '17',
              '09',
              '09'
            ]
            ]
          },
          {
            beats: [
              [
              '20',
              '21',
              '22',
              '23',
              '09',
              '09'
            ],   
            [
              '24',
              '25',
              '26',
              '27',
              '09',
              '09'
            ],
            [
              '20',
              '21',
              '22',
              '23',
              '09',
              '09'
            ],   
            [
              '24',
              '25',
              '26',
              '27',
              '09',
              '09'
            ]
            ]            
          },
          {
            beats: [
              [
              '30',
              '31',
              '32',
              '33',
              '09',
              '09'
            ],   
            [
              '34',
              '35',
              '36',
              '37',
              '09',
              '09'
            ],
            [
              '30',
              '31',
              '32',
              '33',
              '09',
              '09'
            ],   
            [
              '34',
              '35',
              '36',
              '37',
              '09',
              '09'
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
