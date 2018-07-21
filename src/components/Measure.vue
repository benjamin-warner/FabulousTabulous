<template>
  <div class="measure">
        <div class="one" v-for="(string, stringKey) in tab.strings" :key="stringKey"><strong>{{string}}</strong>
          <span class="two" v-for="(bar, barKey) in tab.bars" :key="barKey"><strong>|</strong>-<span class="three" v-for="(beat, beatKey) in bar.beats" :key="beatKey">-<strong>{{tab.bars[barKey].beats[beatKey][stringKey]}}</strong>-</span>-</span>
        </div>
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
              '01',
              '01',
              '02',
              '03',
              '09',
              '84'
            ],   
            [
              '23',
              '05',
              '06',
              '07',
              '09',
              '85'
            ],
              [
              '45',
              '01',
              '02',
              '03',
              '09',
              '86'
            ],   
            [
              '67',
              '05',
              '06',
              '07',
              '09',
              '87'
            ]            
            ]
          },
          {
            beats: [
              [
              '89',
              '11',
              '12',
              '13',
              '09',
              '88'
            ],   
            [
              '10',
              '15',
              '16',
              '17',
              '09',
              '89'
            ],
              [
              '11',
              '11',
              '12',
              '13',
              '09',
              '90'
            ],   
            [
              '12',
              '15',
              '16',
              '17',
              '09',
              '91'
            ]
            ]
          },
          {
            beats: [
              [
              '13',
              '21',
              '22',
              '23',
              '09',
              '92'
            ],   
            [
              '14',
              '25',
              '26',
              '27',
              '09',
              '93'
            ],
            [
              '15',
              '21',
              '22',
              '23',
              '09',
              '94'
            ],   
            [
              '16',
              '25',
              '26',
              '27',
              '09',
              '95'
            ]
            ]            
          },
          {
            beats: [
              [
              '17',
              '31',
              '32',
              '33',
              '09',
              '96'
            ],   
            [
              '18',
              '35',
              '36',
              '37',
              '09',
              '97'
            ],
            [
              '19',
              '31',
              '32',
              '33',
              '09',
              '98'
            ],   
            [
              '20',
              '35',
              '36',
              '37',
              '09',
              '99'
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

.one {
  padding: 1px;
   border: 1px solid black;
} 

 .two {
  padding: 1px;
   border: 1px solid red;
}

.measure {
  font-family: 'Courier New', Courier, monospace;
}

</style>
