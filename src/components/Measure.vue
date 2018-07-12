<template>
  <div class="measure">
      <div class="strings" v-for="(string, key) in tab.strings" :key="key">
        <StringComponent :notes="string.notes"/>
      </div>
  </div>
</template>

<script>

import StringComponent from './String.vue'

export default {
  name: 'Measure',
  components: {
    StringComponent
  },
  data: function(){
    return {
        tab: {
        strings: [
            {
            notes: ['3','1','1','0']
            },
            {
            notes: ['3','3','1','1']
            },
            {
            notes: ['0','2','2','0']
            },
            {
            notes: ['0','0','3','2']
            },
            {
            notes: ['2','-','3','3']
            },
            {
            notes: ['3','-','1','0']
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

.tab-staff {
  font-size: 36pt;
  font-family: 'Courier New', Courier, monospace;
}
</style>
