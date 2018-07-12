<template>
  <div class="tab">
    <MeasureComponent/>
  </div>
</template>

<script>

import MeasureComponent from '../components/Measure.vue'

export default {
  name: 'Tab',
  components: {
    MeasureComponent
  },
  data: function(){
    return {
        tab: {
            
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

.tab-staff {
  font-size: 36pt;
  font-family: 'Courier New', Courier, monospace;
}
</style>
