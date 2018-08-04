/* eslint-disable */
const state = {
  tuning: [
    'e',
    'B',
    'G',
    'D',
    'A',
    'E'
  ],
  measures: {
    0: {
      id: '0',
      bars: ['0','1']
    },
    1: {
      id: '1',
      bars: ['2']
    }
  },
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
  getMeasures: (state) => {
    return state.measures;
  },
  getBars: (state) => (id) => {
    return state.measures[id].bars.map(barId => state.bars[barId]);
  },
  getBeats: (state) => (barId) => {
    return state.bars[barId].beats;
  },
  getChord: (state) => (payload) => {
    return state.bars[payload.barId].beats[payload.beatId];
  },
  isLastBar: (state) => (payload) => {
    let measure = state.measures[payload.measureId];
    return measure.bars[measure.bars.length-1] === payload.barId;
  }
}

const mutations = {
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
