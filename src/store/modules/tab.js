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
      id: '07',
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
    return Object.keys(state.measures).length;
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
    return state.bars[barId].map(beatId => state.beats[beatId]);
  },
  chordOfBeat: (state) => (payload) => {
    return state.bars[payload.barId].beats[payload.beatId];
  },
  noteOfChord: (state) => (payload) => {
    return state.bars[payload.barId].beats[payload.beatId][payload.noteId];
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
    console.log(measureId)
    for(let barId of state.measures[measureId].bars){
      for(let beatId of state.bars[barId].beats){
        Vue.delete(state.beats, beatId);
      }
      Vue.delete(state.bars, barId);
    }
    Vue.delete(state.measures, measureId)
    state.tab.measures.splice(index, 1);
  },
  addBar(state, payload){
    let measureBars = state.measures[payload.toMeasure].bars;
    if(measureBars.length < 4){
      let newBar = {};
      newBar.beats = [];
      for (let i = 0; i < 4; i++) {
        newBar.beats.push(['','','','','','']);
      }
      newBar.id = StoreHelpers.makeGUID();
      state.bars[newBar.id] = newBar;
      measureBars.splice(payload.atIndex, 0, newBar.id);
    }
  },
  deleteBar(state, payload){
    let barRefIndex = state.measures[payload.measureId].bars.indexOf(payload.barId);
    state.measures[payload.measureId].bars.splice(barRefIndex, 1);
    let barsBeats = state.bars[payload.barId].beats;
    for(let beatId of barBeats){
      Vue.delete(state.beats, beatId)
    }
    // Vue.$delete(state.bars, payload.barId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
