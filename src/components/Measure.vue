<template>
  <div class="measure">
    <span class="bars-list" v-for="(bar, barKey) in tab.bars" :key="barKey">
      <BarComponent :beats="bar"/>
    </span>
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
            sounds: [
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
            sounds: [
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
