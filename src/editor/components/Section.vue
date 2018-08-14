<template>
  <g id="section" class="-block">
    <g v-for="(string, stringIndex) in tuning" :key="string">
      <rect x="0" :y="index*145+stringIndex*25+10" :width="barCountOfSection(id)*320" height="1" style="fill: black"/>
    </g>
    <g class="section-block" v-for="(bar, barKey) in barsOfSection(id)" :key="barKey">
      <BarComponent :id="bar.id" class="section-block" :index="barKey"/>
      <rect :x="barKey*320" :y="index*145+10" height="125" width="1"/>
    </g>
  </g>
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
     'barCountOfSection',
     'sectionCount',
     'sectionIndex',
     'isLastBar',
     'tuning'
    ]),
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
.section-block {
  display: inline-block;
  vertical-align: middle;
}
</style>
