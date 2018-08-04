<template>
  <div id="measure">
    <div class="measure measure-block" v-for="(bar, barKey) in getBars(id)" :key="barKey">
      <BarComponent :id="bar.id" :beats="bar.beats"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BarComponent from './Bar.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "Measure",
  props: {
    id: String
  },
  components: {
    BarComponent
  },
  computed: {
    ...mapGetters('tab', {
      getBars: 'getBars'
    }),
    measureNotFull() {
      return this.bars.length < 4;
    },
    measureEmpty() {
      return this.bars.length === 0;
    }
  },
  methods: {
    ...mapMutations('tab', ['deleteBarAndReferences']),
    removeBar(id){
      this.deleteBarAndReferences({
        measureId: this.id,
        barId: id
      });
    },
    insertBarAt(index) {
      if(this.bars.length < 4){
        var newBar = {};
        newBar.beats = [];
        for (var i = 0; i < 4; i++) {
          newBar.beats.push(['','','','','','']);
        }
        newBar.id = +new Date();
        ChangeMarshal.addValue(this.bars, index, newBar);
      }
    },
    revealId(){
      return this.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#measure{
  display: table;
}

.measure-text{
  font-family: 'Roboto Mono';
  font-size: 10pt;
  
  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.measure-block {
  display: table-cell;
  vertical-align: middle;
}
</style>
