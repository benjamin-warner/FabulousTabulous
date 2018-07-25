<template>
  <div id="app">
    <TabComponent/>
  </div>
</template>

<script>
import TabComponent from './components/Tab.vue'

export default {
  name: 'app',
  components: {
    TabComponent,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 36pt;
}
</style>
