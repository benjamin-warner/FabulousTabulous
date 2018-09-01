<template>
  <div id="editor">
    <select v-model="selectedTab">
      <option disabled value="">Load tab...</option>
      <option v-for="(name, key) in savedTabs" :key="key">{{ name }}</option>
    </select>

    <button v-if="selectedTab !== ''" @click="getTab">Load</button>
    <br>
    <button v-if="tabName !== undefined" @click="saveTab">Save</button>
    <input type="text" placeholder="New tab name" v-model="saveName">
    <button @click="saveTabAs">Save as</button>
    <TabComponent/>
  </div>
</template>

<script>
import TabComponent from './components/Tab.vue'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'Editor',
  components: {
    TabComponent
  },
  computed: {
    ...mapGetters('editor', [
      'canUndo',
      'canRedo',
      'tabName',
      'generateSaveTab'
    ])
  },
  created() {
    document.addEventListener('keydown', this.onKeyPress);
    this.savedTabs = JSON.parse(localStorage.getItem('saved-tab-list'));
    this.loadTab({
      tuning: ['e', 'B', 'G', 'D', 'A', 'E'],
      tab: {
        bars: ['0']
      },
      bars: {
        '0': {
          id: '0',
          beats: ['0', '1', '2', '3']
        }
      },
      beats: {
        '0': {
          id: '0',
          parentId: '0',
          notes: ['0', '1', '2', '3', '4', '5']
        },
        '1': {
          id: '1',
          parentId: '0',
          notes: ['6', '7', '8', '9', '10', '11']
        },
        '2': {
          id: '2',
          parentId: '0',
          notes: ['12', '13', '14', '15', '16', '17']
        },
        '3': {
          id: '3',
          parentId: '0',
          notes: ['18', '19', '20', '21', '22', '23']
        }
      },
      notes: {
        '0': { parentId: '0', id: '0', note: '0' },
        '1': { id: '1', parentId: '0', note: '' },
        '2': { id: '2', parentId: '0', note: '' },
        '3': { id: '3', parentId: '0', note: '' },
        '4': { id: '4', parentId: '0', note: '' },
        '5': { id: '5', parentId: '0', note: '' },

        '6': { id: '6', parentId: '1', note: '' },
        '7': { id: '7', parentId: '1', note: '' },
        '8': { id: '8', parentId: '1', note: '' },
        '9': { id: '9', parentId: '1', note: '' },
        '10': { id: '10', parentId: '1', note: '' },
        '11': { id: '11', parentId: '1', note: '' },

        '12': { id: '12', parentId: '2', note: '' },
        '13': { id: '13', parentId: '2', note: '' },
        '14': { id: '14', parentId: '2', note: '' },
        '15': { id: '15', parentId: '2', note: '35' },
        '16': { id: '16', parentId: '2', note: '' },
        '17': { id: '17', parentId: '2', note: '' },

        '18': { id: '18', parentId: '3', note: '' },
        '19': { id: '19', parentId: '3', note: '' },
        '20': { id: '20', parentId: '3', note: '' },
        '21': { id: '21', parentId: '3', note: '' },
        '22': { id: '22', parentId: '3', note: '' },
        '23': { id: '23', parentId: '3', note: '9' }
      }
    });
  },
  destroyed() {
    document.removeEventListener('keydown', this.onKeyPress);
  },
  data() {
    return {
      saveName: '',
      savedTabs: [],
      selectedTab: ''
    }
  },
  methods: {
    ...mapActions('editor', ['undo', 'redo', 'loadTab']),
    ...mapMutations('editor', ['setTabName']),
    onKeyPress(evt) {
      // Because Steve Jobs.
      if (navigator.appVersion.indexOf('Mac') !== -1) {
        // Cmd + Z
        if (evt.metaKey && evt.keyCode === 90) {
          evt.preventDefault();
          if (this.canUndo) {
            this.undo();
          }
        } else if (evt.metaKey && evt.keyCode === 89) {
          // Cmd + Y
          evt.preventDefault();
          if (this.canRedo) {
            this.redo();
          }
        }
      }
      // Ctrl Z - undo
      if (evt.ctrlKey && evt.keyCode === 90) {
        evt.preventDefault();
        if (this.canUndo) {
          this.undo();
        }
      } else if (evt.ctrlKey && evt.keyCode === 89) {
        // Ctrl Y - redo
        evt.preventDefault();
        if (this.canRedo) {
          this.redo();
        }
      }
    },
    saveTab(){
      localStorage.setItem(this.tabName, JSON.stringify(this.generateSaveTab));
    },
    saveTabAs(){
      let savedTabList = JSON.parse(localStorage.getItem('saved-tab-list')) || [];
      if(savedTabList.includes(this.saveName)){
        alert('Tab already exists!');
      } else {
        savedTabList.push(this.saveName);
        this.setTabName(this.saveName);
        this.savedTabs = savedTabList;
        localStorage.setItem('saved-tab-list', JSON.stringify(savedTabList));
        let tabClone = JSON.stringify(this.generateSaveTab);
        console.log(this.generateSaveTab);
        localStorage.setItem(this.saveName, tabClone);
      }
    },
    getTab(){
      let tab = JSON.parse(localStorage.getItem(this.selectedTab));
      this.loadTab(tab);
    }
  }
};
</script>

<style>
#editor{
  height: 100%
}
</style>
