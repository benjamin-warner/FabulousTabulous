<template>
  <div class="bar noselect">
    <div v-for="(string, stringKey) in tuning.length" :key="stringKey">
      <span v-for="(beat, beatKey) in barData.beats" :key="beatKey">{{spacer}}<strong>{{barData.beats[beatKey][stringKey]}}</strong></span>{{spacer}}<strong>|</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: {
    tuning: undefined,
    barData: undefined
  },
  data: function(){
    return{
      spacer: '--'
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 48pt;
}

.bar {
  display: inline-block;
  font-size: 12pt;
  font-family: 'Courier New', Courier, monospace;
}

.bar:hover{
  background: yellowgreen;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

</style>
