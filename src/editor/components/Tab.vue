<template>
  <div class="tab">
    <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <div class="tab-block">
        <div>
          <button v-on:click="queueAddSection(sectionIndex)">+</button>
        </div>
        <div>
          <button v-if="sectionCount > 1" v-on:click="queueRemoveSection(section.id)">x</button>
        </div>
        <div>
          <button v-on:click="queueAddSection(sectionIndex+1)">+</button>
        </div>
      </div>
      <SectionComponent class="tab-block" :id="section.id"/>
    </div>
  </div>
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

.tab-block{
  display: inline-block;
}

</style>
