<template>
  <div class="bar noselect" v-on:click="onBarSelected">
    <div class="beat" v-for="(beat, beatKey) in barData.beats" :key="beatKey">
      <div v-for="(string, stringKey) in tuning" :key="stringKey">
        {{spacer}}<strong>{{barData.beats[beatKey][stringKey]}}</strong>
      </div>
    </div>
  </div>
  <!-- <span v-for="(beat, beatKey) in barData.beats" :key="beatKey">{{spacer}}<strong>{{barData.beats[beatKey][stringKey]}}</strong></span>{{spacer}}<strong>|</strong> -->
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
  },
  methods: {
    onBarSelected: function(){
      
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

.beat{
  display: inline-block;
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
