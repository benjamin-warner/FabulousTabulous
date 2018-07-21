<template>
  <div class="bar bar-block noselect" v-on:click="onBarSelected">
    <div class="bar-block" v-for="(beat, beatKey) in barData.beats" :key="beatKey">
      <div class="bar-block">
        <div v-for="(string, stringKey) in tuning" :key="stringKey">
         {{spacer}}
        </div>
      </div>        
      <div class="beat bar-block">
        <div v-for="(string, stringKey) in tuning" :key="stringKey">
          <strong><span class="note" v-on:click.self="onNoteSelected(stringKey)">{{barData.beats[beatKey][stringKey]}}</span></strong>
        </div>
      </div>      
    </div>
    <div class="bar-block">
          <div v-for="(string, stringKey) in tuning" :key="stringKey">
          {{spacer}}
        </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Bar',
  props: {
    tuning: undefined,
    barData: undefined,
    spacer: String,
  },
  data: function(){
    return{
    }
  },
  methods: {
    onBarSelected: function(){
      console.log("bar")
    },
    onNoteSelected: function(index){
      console.log("note", index);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.bar {
  font-size: 14pt;
  font-family: 'Courier New', Courier, monospace;
}

.bar-block{
  display: inline-block;
}

.bar:hover{
  background: yellowgreen;
}

.beat:hover{
  background: powderblue;
}

.note:hover{
  background: tomato;
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
