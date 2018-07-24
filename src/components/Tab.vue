<template>
  <div class="tab">
    <div v-for="(measure, measureKey) in measures" :key="measureKey">
      <MeasureComponent :index="measureKey"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MeasureComponent from './Measure.vue'
import TabStore from './TabStore.js'

export default {
  name: 'Tab',
  components: {
    MeasureComponent
  },
  data: function(){
    return {
      measures: undefined
    }
  },
  created: function(){
    TabStore.loadTab({
    spacer: '--',
    tuning: [
    'e',
    'B',
    'G',
    'D',
    'A',
    'E'
    ],
    measures: [{
      bars: [
        {
          beats: [
            [
            '00',
            '01',
            '02',
            '03',
            '04',
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
        ]
        }
      ] //end bar array
    }] // end measure array
    }) // end tab
    this.measures = TabStore.getMeasures()
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

.tab-staff {
  font-size: 36pt;
  font-family: 'Courier New', Courier, monospace;
}
</style>
