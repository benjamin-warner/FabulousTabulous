<template>
  <svg id="tab">
    <rect width="100%" height="100%" fill="lavender"/>
    <g v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <SectionComponent class="tab-block" :id="section.id" :index="sectionIndex"/>
    </g>
  </svg>
</template>

<script>
import SectionComponent from './Section.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Tab',
  components: {
    SectionComponent
  },
  computed: {
    ...mapState('editor', ['tuning']),
    ...mapGetters('editor', [
      'sections',
      'sectionCount'
    ])
  },
  methods: {
    ...mapActions('editor',[
      'queueAddSection',
      'queueRemoveSection',
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tab{
  width: 100%;
  height: 100%;
}
.tab-block{
  display: inline-block;
}

</style>
