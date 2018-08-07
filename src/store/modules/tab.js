/* eslint-disable */
import Vue from 'vue'

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
    measures: ['0']
  },
  measures: {
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
      notes: ['','','','','','','']
    },
    '2':{
      id: '2',
      parentId: '0',
      notes: ['6','7','8','9','10','11']
    },
    '3':{
      id: '3',
      parentId: '0',
      notes: ['','','','','','','']
    }
  }
}

const getters = {
  measures: (state) => {
    return state.tab.measures.map(measureId => state.measures[measureId]);
  },
  measureCount: (state) => {
    return state.tab.measures.length;
  },
  barsOfMeasure: (state) => (measureId) => {
    return state.measures[measureId].bars.map(barId => state.bars[barId]);
  },
  barCountForMeasure: (state) => (measureId) => {
    let barReferences = state.measures[measureId].bars;
    return Object.keys(barReferences).length;
  },
  isLastBar: (state) => (barId) => {
    let parentId = state.bars[barId].parentId;
    let barReferences = state.measures[parentId].bars;
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
  createMeasure(state, index){
    let measureId = this.makeGUID();
    state.tab.measures.splice(index, 0, measureId);
    Vue.set(state.measures, measureId, { id: measureId, bars: [] });
    while(state.measures[measureId].bars.length < 4){
      let barId = this.makeGUID();
      this.createBar(state, barId, measureId);
      state.measures[measureId].bars.push(barId);
    }
  },
  createBar(state, barId, parentId){
    Vue.set(state.bars, barId, { id: barId, parentId: parentId, beats: [] });
    while(state.bars[barId].beats.length < 4){
      let beatId = this.makeGUID();
      Vue.set(state.beats, beatId, { id: beatId, parentId: barId, notes: ['','','','','','',] });
      state.bars[barId].beats.push(beatId);
    }
  },
  deleteMeasure(state, measureId){
    let measureIndex = state.tab.measures.indexOf(measureId);
    state.tab.measures.splice(measureIndex, 1);
    for(let barId of state.measures[measureId].bars){
      this.deleteBar(state, barId)
    }
    Vue.delete(state.measures, measureId)
  },
  deleteBar(state, barId){
    for(let beatId of state.bars[barId].beats){
      Vue.delete(state.beats, beatId);
    }
    Vue.delete(state.bars, barId);
  }
}

const mutations = {
  addMeasure(state, index){
    Helpers.createMeasure(state, index);
  },
  addBar(state, payload){
    let barId = Helpers.makeGUID();
    state.measures[payload.parentId].bars.splice(payload.index, 0, barId);
    Helpers.createBar(state, barId, payload.parentId);
  },
  deleteMeasure(state, measureId){
    Helpers.deleteMeasure(state, measureId);
  },
  deleteBar(state, barId){
    let parentId = state.bars[barId].parentId;
    let parent = state.measures[parentId];
    let barIndex = parent.bars.indexOf(barId);
    Vue.delete(parent.bars, barIndex);
    Helpers.deleteBar(state, barId);
  },
  backspaceNote(state, noteId){
    let newValue = state.notes[noteId].note.slice(0, -1);
    Vue.set(state.notes[noteId], 'note', newValue);
  },
  appendNote(state, payload){
    let newValue = state.notes[payload.noteId].note + payload.addition;
    Vue.set(state.notes[payload.noteId], 'note', newValue);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
