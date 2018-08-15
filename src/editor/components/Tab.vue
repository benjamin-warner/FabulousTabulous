<template>
  <svg id="tab" width="100%" :height="sectionCount*145" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <SectionComponent v-for="(section, sectionIndex) in sections" :key="sectionIndex" :index="sectionIndex" :id="section.id"/>
  </svg>
</template>

<script>
import SectionComponent from './Section.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Tab',
  components: {
    SectionComponent
  },
  computed: {
    ...mapGetters('editor', [
      'sections',
      'sectionCount',
      'barsOfSection',
      'tuning'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-block{
  display: inline-block;
}

</style>
