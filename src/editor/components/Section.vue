<template>
  <div id="section" class="-block">
    <div class="section-block" v-for="(bar, barKey) in barsOfSection(id)" :key="barKey">
      <div id="bar-control">
        <Button v-on:click="addBar({parentId: id, index: barKey})">+</Button>
        <Button v-if="sectionCount > 1 || barCountOfSection(id) > 1" v-on:click="handleDeletion(bar.id)">X</Button>
        <Button v-on:click="addBar({parentId: id, index: barKey+1})">+</Button>
      </div>
      <BarComponent :id="bar.id" class="section-block" />
      <svg v-if="isLastBar(bar.id)" width="4" height="145" class="section-block" >
        <rect x="0" y="10" width="4" height="126" style="fill: black"/>
      </svg>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BarComponent from './Bar.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "Section",
  props: {
    id: String
  },
  components: {
    BarComponent
  },
  computed: {
    ...mapGetters('tab', [
     'barsOfSection',
     'barCountOfSection',
     'sectionCount',
     'isLastBar'
    ]),
  },
  methods: {
    ...mapMutations('tab',[
      'deleteBar',
      'deleteSection',
      'addBar'
    ]),
    handleDeletion(barId){
      if(this.barCountOfSection(this.id) === 1){
        this.deleteSection(this.id);
      }
      else{
        this.deleteBar(barId);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.section-text{
  font-family: 'Roboto Mono';
  font-size: 10pt;
  
  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.section-block {
  display: inline-block;
  vertical-align: middle;
}
</style>
