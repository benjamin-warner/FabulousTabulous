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
    measures: ['0', '1']
  },
  measures: {
    '0':{
      id: '0',
      bars: ['0']
    },
    '1':{
      id: '1',
      bars: ['1']
    }
  },
  bars: {
    '0':{
      id: '0',
      beats: ['0']
    },
    '1':{
      id: '1',
      beats: ['1']
    }
  },
  beats: {
    '0':{
      id: '0',
      notes: ['0','1','2','3','4','5']
    },
    '1':{
      id: '1',
      notes: ['6','7','8','9','10','11']
    }
  },
  notes: {
    '0':{id: '0', note: '0'},
    '1':{id: '1', note: '1'},
    '2':{id: '2', note: '2'},
    '3':{id: '3', note: '3'},
    '4':{id: '4', note: '4'},
    '5':{id: '5', note: '5'},
    '6':{id: '6', note: '6'},
    '7':{id: '7', note: '7'},
    '8':{id: '8', note: '8'},
    '9':{id: '9', note: '9'},
    '10':{id: '10', note: '10'},
    '11':{id: '11', note: '11'}
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
  isLastBar: (state) => (payload) => {
    let measure = state.measures[payload.measureId];
    return measure.bars[measure.bars.length-1] === payload.barId;
  },
  beatsOfBar: (state) => (barId) => {
    return state.bars[barId].beats.map(beatId => state.beats[beatId]);
  },
  indexOfBeat: (state) => (payload) => {
    return state.bars[payload.barId].beats.indexOf(payload.beatId);
  },
  notesOfBeat: (state) => (beatId) => {
    return state.beats[beatId].notes.map(noteId => state.notes[noteId]);
  },
  note: (state) => (noteId) => {
    return state.notes[noteId].note;
  }
}

const Helpers = {
  makeGUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  },
  createMeasure(state, index){
    let start =+new Date();
    let measureId = this.makeGUID();
    state.tab.measures.splice(index, 0, measureId);
    Vue.set(state.measures, measureId, { id: measureId, bars: [] });
    while(state.measures[measureId].bars.length < 4){
      let barId = this.makeGUID();
      this.createBar(state, barId);
      state.measures[measureId].bars.push(barId);
    }
    console.log(new Date() - start)
  },
  createBar(state, barId){
    Vue.set(state.bars, barId, { id: barId, beats: [] });
    while(state.bars[barId].beats.length < 4){
      let beatId = this.makeGUID();
      Vue.set(state.beats, beatId, { id: beatId, notes: [] });
      // This will never be refactored because the overhead of func calls.
      while(state.beats[beatId].notes.length < 6){
        let noteId = this.makeGUID();
        Vue.set(state.notes, noteId, {id: noteId, note: ''});
        state.beats[beatId].notes.push(noteId);
      }
      state.bars[barId].beats.push(beatId);
    }
  },
  deleteMeasure(state, index){
    let measureId = state.tab.measures[index];
    for(let barId of state.measures[measureId].bars){
      this.deleteBar(state, barId)
    }
    Vue.delete(state.measures, measureId)
    state.tab.measures.splice(index, 1);
  },
  deleteBar(state, barId){
    for(let beatId of state.bars[barId].beats){
      this.deleteBeat(state, beatId);
      Vue.delete(state.beats, beatId);
    }
  },
  deleteBeat(state, beatId){
    for(let noteId of state.beats[beatId].notes){
      Vue.delete(state.notes, noteId);
    }
  }
}

const mutations = {
  addMeasure(state, index){
    Helpers.createMeasure(state, index);
  },
  addBar(state, payload){
    let barId = Helpers.makeGUID();
    state.measures[payload.parentId].bars.splice(payload.index, 0, barId);
    Helpers.createBar(state, barId);
  },
  deleteMeasure(state, index){
    Helpers.deleteMeasure(state, index);
  },
  deleteBar(state, payload){
    let parentId = payload.parentId;
    let index = payload.index;
    let barId = state.measures[parentId].bars[index];
    for(let beatId of state.bars[barId].beats){
      Vue.delete(state.beats, beatId);
    }
    Vue.delete(state.bars, barId);
    state.measures[parentId].bars.splice(index, 1);
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
