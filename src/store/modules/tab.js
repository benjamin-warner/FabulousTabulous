/* eslint-disable */
import Vue from 'vue'
import Editor from './editor.js'

const state = {
  tuning: [
    'e',
    'B',
    'G',
    'D',
    'A',
    'E'
  ],
  tab: {
    sections: ['0']
  },
  sections: {
    '0':{
      id: '0',
      bars: ['0']
    },
  },
  bars: {
    '0':{
      id: '0',
      parentId: '0',
      beats: ['0', '1']
    }
  },
  beats: {
    '0':{
      id: '0',
      parentId: '0',
      notes: ['0','1','2','3','4','5']
    },
    '1':{
      id: '1',
      parentId: '0',
      notes: ['6','7','8','9','10','11']
    },
  },
  notes: {
    '0': { parentId: '0', id: '0', note: '0'},
    '1': { id: '1', parentId: '0', note: '1'},
    '2': { id: '2', parentId: '0', note: '2'},
    '3': { id: '3', parentId: '0', note: '3'},
    '4': { id: '4', parentId: '0', note: '4'},
    '5': { id: '5', parentId: '0', note: '5'},

    '6': { id: '6', parentId: '1', note: '6'},
    '7': { id: '7', parentId: '1', note: '7'},
    '8': { id: '8', parentId: '1', note: '8'},
    '9': { id: '9', parentId: '1', note: '9'},
    '10': { id: '10', parentId: '1', note: '10'},
    '11': { id: '11', parentId: '1', note: '11'}
  }
}

const getters = {
  sections: (state) => {
    return state.tab.sections.map(sectionId => state.sections[sectionId]);
  },
  sectionIdViaTabIndex: (state) => (index) => {
    return state.tab.sections[index];
  },
  sectionIndex: (state) => (sectionId) => {
    return state.tab.sections.indexOf(sectionId);
  },
  sectionCount: (state) => {
    return state.tab.sections.length;
  },
  barsOfSection: (state) => (sectionId) => {
    return state.sections[sectionId].bars.map(barId => state.bars[barId]);
  },
  barIdViaSectionIndex: (state) => (payload) => {
    return state.sections[payload.parentId].bars[payload.index];
  },
  barParent: (state) => (barId) => {
    let parentId = state.bars[barId].parentId;
    return state.sections[parentId];
  },
  barCountOfSection: (state) => (sectionId) => {
    let barReferences = state.sections[sectionId].bars;
    return Object.keys(barReferences).length;
  },
  isLastBar: (state) => (barId) => {
    let parentId = state.bars[barId].parentId;
    let barReferences = state.sections[parentId].bars;
    return barReferences[barReferences.length-1] === barId;
  },
  beatsOfBar: (state) => (barId) => {
    return state.bars[barId].beats.map(beatId => state.beats[beatId]);
  },
  beat: (state) => (beatId) => {
    return state.beats[beatId];
  },
  notesOfBeat: (state) => (beatId) => {
    return state.beats[beatId].notes.map(noteId => state.notes[noteId]);
  },
  note: (state) => (noteId) => {
    return state.notes[noteId];
  }
}

const Helpers = {
  makeGUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  },
  createSection(state, index){
    let sectionId = this.makeGUID();
    state.tab.sections.splice(index, 0, sectionId);
    Vue.set(state.sections, sectionId, { id: sectionId, bars: [] });
    
    let barId = this.makeGUID();
    this.createBar(state, barId, sectionId);
    state.sections[sectionId].bars.push(barId);
  },
  createBar(state, barId, parentId){
    Vue.set(state.bars, barId, { id: barId, parentId: parentId, beats: [] });
    while(state.bars[barId].beats.length < 4){
      let beatId = this.makeGUID();
      Vue.set(state.beats, beatId, { id: beatId, parentId: barId, notes: [] });
      while(state.beats[beatId].notes.length < 6){
        let noteId = this.makeGUID();
        Vue.set(state.notes, noteId, {id: noteId, parentId: beatId, note: ''});
        state.beats[beatId].notes.push(noteId);
      }
      state.bars[barId].beats.push(beatId);
    }
  },
  deleteSection(state, sectionId){
    for(let barId of state.sections[sectionId].bars){
      this.deleteBar(state, barId)
    }
    Vue.delete(state.sections, sectionId)
  },
  deleteBar(state, barId){
    for(let beatId of state.bars[barId].beats){
      for(let noteId of state.beats[beatId].notes){
        Vue.delete(state.notes, noteId)
      }
      Vue.delete(state.beats, beatId);
    }
    Vue.delete(state.bars, barId);
  }
}

const mutations = {
  addSection(state, index){
    Helpers.createSection(state, index);
  },
  addSectionReference(state, payload){
    state.tab.sections.splice(payload.index, 0, payload.sectionId);
  },
  removeSectionReference(state, index){
    state.tab.sections.splice(index, 1);
  },
  deleteSection(state, sectionId){
    Helpers.deleteSection(state, sectionId);
  },
  addBar(state, payload){
    let barId = Helpers.makeGUID();
    state.sections[payload.parentId].bars.splice(payload.index, 0, barId);
    Helpers.createBar(state, barId, payload.parentId);
  },
  addBarReference(state, payload){
    let barRefs = state.sections[payload.parentId].bars;
    barRefs.splice(payload.index, 0, payload.barId);
  },
  removeBarReference(state, payload){
    let barRefs = state.sections[payload.parentId].bars;
    barRefs.splice(payload.index, 1,);
  },
  deleteBar(state, barId){
    let parentId = state.bars[barId].parentId;
    let parent = state.sections[parentId];
    let barIndex = parent.bars.indexOf(barId);
    Vue.delete(parent.bars, barIndex);
    Helpers.deleteBar(state, barId);
  },
  replaceNote(state, payload){
    Vue.set(state.notes[payload.id], 'note', payload.value);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  modules: {
    Editor
  }
}
