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
      beats: ['0', '1', '2', '3']
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
      notes: ['','','','','','']
    },
    '2':{
      id: '2',
      parentId: '0',
      notes: ['6','7','8','9','10','11']
    },
    '3':{
      id: '3',
      parentId: '0',
      notes: ['','','','','','']
    }
  }
}

const getters = {
  sections: (state) => {
    return state.tab.sections.map(sectionId => state.sections[sectionId]);
  },
  sectionCount: (state) => {
    return state.tab.sections.length;
  },
  barsOfSection: (state) => (sectionId) => {
    return state.sections[sectionId].bars.map(barId => state.bars[barId]);
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
  notesOfBeat: (state) => (beatId) => {
    return state.beats[beatId].notes
  },
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
      Vue.set(state.beats, beatId, { id: beatId, parentId: barId, notes: ['','','','','','',] });
      state.bars[barId].beats.push(beatId);
    }
  },
  deleteSection(state, sectionId){
    let sectionIndex = state.tab.sections.indexOf(sectionId);
    state.tab.sections.splice(sectionIndex, 1);
    for(let barId of state.sections[sectionId].bars){
      this.deleteBar(state, barId)
    }
    Vue.delete(state.sections, sectionId)
  },
  deleteBar(state, barId){
    for(let beatId of state.bars[barId].beats){
      Vue.delete(state.beats, beatId);
    }
    Vue.delete(state.bars, barId);
  }
}

const mutations = {
  addSection(state, index){
    Helpers.createSection(state, index);
  },
  addBar(state, payload){
    let barId = Helpers.makeGUID();
    state.sections[payload.parentId].bars.splice(payload.index, 0, barId);
    Helpers.createBar(state, barId, payload.parentId);
  },
  deleteSection(state, sectionId){
    Helpers.deleteSection(state, sectionId);
  },
  deleteBar(state, barId){
    let parentId = state.bars[barId].parentId;
    let parent = state.sections[parentId];
    let barIndex = parent.bars.indexOf(barId);
    Vue.delete(parent.bars, barIndex);
    Helpers.deleteBar(state, barId);
  },
  appendNote(state, payload){
    let notes = state.beats[payload.beatId].notes;
    Vue.set(notes, payload.index, notes[payload.index] + payload.value);
  },
  backspaceNote(state, payload){
    let newNote = state.beats[payload.beatId].notes[payload.index].slice(0, -1);
    Vue.set(state.beats[payload.beatId].notes, payload.index, newNote);
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
