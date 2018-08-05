/* eslint-disable */
import Vue from 'vue'
import StoreHelpers from '../storeHelpers'
import storeHelpers from '../storeHelpers';

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
      beats: ['0', '1', '2', '3']
    },
    '1':{
      id: '1',
      beats: ['4', '5', '6', '7']
    }
  },
  beats: {
    '0':{
      id: '0',
      chord: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '84'
      ]
    },
    '1':{
      id: '1',
      chord: [
        '23',
        '05',
        '06',
        '07',
        '09',
        '85'
      ]
    },
    '2':{
      id: '2',
      chord: [
        '45',
        '01',
        '02',
        '03',
        '09',
        '86'
      ]
    },
    '3':{
      id: '3',
      chord: [
        '67',
        '05',
        '06',
        '07',
        '09',
        '87'
      ]
    },
    '4':{
      id: '4',
      chord: [
        '13',
        '21',
        '22',
        '23',
        '09',
        '92'
      ]
    },
    '5':{
      id: '5',
      chord: [
        '14',
        '25',
        '26',
        '27',
        '09',
        '93'
      ]
    },
    '6':{
      id: '6',
      chord: [
        '15',
        '21',
        '22',
        '23',
        '09',
        '94'
      ]
    },
    '7':{
      id: '7',
      chord: [
        '16',
        '25',
        '26',
        '27',
        '09',
        '95'
      ]
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
  isLastBar: (state) => (payload) => {
    let measure = state.measures[payload.measureId];
    return measure.bars[measure.bars.length-1] === payload.barId;
  },
  beatsOfBar: (state) => (barId) => {
    return state.bars[barId].beats.map(beatId => state.beats[beatId]);
  },
  chordOfBeat: (state) => (beatId) => {
    return state.beats[beatId].chord;
  },
  indexOfBeat: (state) => (payload) => {
    return state.bars[payload.parentId].beats.indexOf(payload.beatId);
  },
  noteOfChord: (state) => (payload) => {
    return state.beats[payload.parentId].chord[payload.noteIndex];
  }
}

const mutations = {
  insertMeasure(state, index){
    let measureId = StoreHelpers.makeGUID();
    state.tab.measures.splice(index, 0, measureId);
    Vue.set(state.measures, measureId, { id: measureId, bars: []});

    while(state.measures[measureId].bars.length < storeHelpers.MAX_BARS){
      let barId = StoreHelpers.makeGUID();
      state.measures[measureId].bars.push(barId);
      Vue.set(state.bars, barId, { id: barId, beats: []});

      while(state.bars[barId].beats.length < 4){
        let beatId = StoreHelpers.makeGUID();
        state.bars[barId].beats.push(beatId);
        Vue.set(state.beats, beatId, {id: beatId, chord: ['','','','','','']});
      }
    }
  },
  deleteMeasure(state, index){
    let measureId = state.tab.measures[index];
    for(let barId of state.measures[measureId].bars){
      for(let beatId of state.bars[barId].beats){
        Vue.delete(state.beats, beatId);
      }
      Vue.delete(state.bars, barId);
    }
    Vue.delete(state.measures, measureId)
    state.tab.measures.splice(index, 1);
  },
  insertBar(state, payload){
    let parentId = payload.parentId;
    let index = payload.index;
    let barId = StoreHelpers.makeGUID();
    state.measures[parentId].bars.splice(index, 0, barId);
    Vue.set(state.bars, barId, {id: barId, beats: []});

    while(state.bars[barId].beats.length < 4){
      let beatId = StoreHelpers.makeGUID();
      state.bars[barId].beats.push(beatId);
      Vue.set(state.beats, beatId, {id: beatId, chord: ['','','','','','']});
    }
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
  backspaceNote(state, payload){
    let parentId = payload.parentId;
    let index = payload.noteIndex;
    let chord = state.beats[parentId].chord;
    let note = chord[index].slice(0, -1);
    Vue.set(chord, index, note);
  },
  appendNote(state, payload){
    let parentId = payload.parentId;
    let index = payload.noteIndex;
    let chord = state.beats[parentId].chord;
    let note = chord[index] + payload.input;
    Vue.set(chord, index, note);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
