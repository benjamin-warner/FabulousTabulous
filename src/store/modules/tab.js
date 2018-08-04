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
  measures: [
    {
      bars: ['0','1']
    },
    {
      bars: ['2']
    }
  ],
  bars: {
    0: {
      id:'0',
      beats:[
        [
          '00',
          '01',
          '02',
          '03',
          '04',
          '84'
        ],
        [
          '23',
          '05',
          '06',
          '07',
          '09',
          '85'
        ],
        [
          '45',
          '01',
          '02',
          '03',
          '09',
          '86'
        ],
        [
          '67',
          '05',
          '06',
          '07',
          '09',
          '87'
        ]
      ]
    },
    1: {
      id: '1',
      beats: [
        [
          '89',
          '11',
          '12',
          '13',
          '09',
          '88'
        ],
        [
          '10',
          '15',
          '16',
          '17',
          '09',
          '89'
        ],
        [
          '11',
          '11',
          '12',
          '13',
          '09',
          '90'
        ],
        [
          '12',
          '15',
          '16',
          '17',
          '09',
          '91'
        ]  
      ]
    },
    2:{
      id: '2',
      beats:[ 
        [
          '13',
          '21',
          '22',
          '23',
          '09',
          '92'
        ],
        [
          '14',
          '25',
          '26',
          '27',
          '09',
          '93'
        ],
        [
          '15',
          '21',
          '22',
          '23',
          '09',
          '94'
        ],
        [
          '16',
          '25',
          '26',
          '27',
          '09',
          '95'
        ]
      ]
    }
  }
}

const getters = {
  measures: (state) => {
    return state.measures;
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
    return state.bars[barId].beats;
  },
  chordOfBeat: (state) => (payload) => {
    return state.bars[payload.barId].beats[payload.beatId];
  }
}

const mutations = {
  addMeasure(state, index){
    state.measures.splice( index, 0, {
      id: index,
      bars: []
    });
    console.log(state.measures);
  },
  deleteMeasure(state, measureId){
    let barReferences = state.measures[measureId].bars;
    for(let reference of barReferences){
      Vue.delete(state.bars, reference);
    }
    state.measures.splice(measureId, 1);
  },
  addBar(state, payload){
    let barReferences = state.measures[payload.toMeasure].bars;
    if(barReferences.length < 4){
      let newBar = {};
      newBar.beats = [];
      for (let i = 0; i < 4; i++) {
        newBar.beats.push(['','','','','','']);
      }
      let unixTimestamp = + new Date();
      newBar.id = unixTimestamp.toString();

      barReferences.splice(payload.atIndex, 0, newBar.id);
      state.bars[newBar.id] = newBar;
    }
  },
  deleteBar(state, payload){
    let barReferences = state.measures[payload.measureId].bars;
    let referenceToDelete = barReferences.indexOf(payload.barId);
    barReferences.splice(referenceToDelete, 1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
