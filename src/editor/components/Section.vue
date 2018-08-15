<template>
  <svg id="section" :width="sectionLength(id)*360" height="145" x="0" :y="yPos">
    <g v-for="(string, stringIndex) in tuning" :key="string">
      <rect x="0" :y="stringIndex*25+10" :width="sectionLength(id)*360" height="1" style="fill: black"/>
    </g>
    <BarComponent v-for="(bar, barIndex) in barsOfSection(id)" :key="barIndex" :id="bar.id" :barIndex="barIndex" :sectionIndex="index"/>
  </svg>
</template>

<script>
import BarComponent from './Bar.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Section',
  props: {
    id: String,
    index: Number
  },
  components: {
    BarComponent
  },
  computed: {
    ...mapGetters('editor', [
     'barsOfSection',
     'sectionLength',
     'tuning'
    ]),
    yPos(){
      return this.index*145;
    }
  },
  methods: {
    ...mapActions('editor', [
      'queueAddBar',
      'queueRemoveBar',
      'queueRemoveSection'
    ]),
    handleDeletion(barId){
      if(this.barCountOfSection(this.id) === 1){
        this.queueRemoveSection(this.id);
      }
      else{
        this.queueRemoveBar(barId);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
