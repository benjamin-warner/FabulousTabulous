<template>
  <div id="app">
    <EditorComponent/>
  </div>
</template>

<script>
import EditorComponent from './editor/Editor.vue'

export default {
  name: 'app',
  components: {
    EditorComponent,
  }
}
</script>

<style>
html{
  height: 100%;
}
body{
  min-height: 100%;
  margin: 0;
}
#app{
  height: 100vh;
  width: 100%;
}
</style>
