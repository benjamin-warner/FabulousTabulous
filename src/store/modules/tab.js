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
      bars: [0]
    },
    1: {
      bars: [1]
    }
  },
  bars: {
    0: {
      beats: [0, 1, 2, 3]
    },
    1: {
      beats: [4, 5, 6, 7]
    }
  },
  beats: [
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
    ],
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
}

const getters = {
  getMeasures: (state) => {
    return state.measures;
  },
  getBars: (state) => (id) => {
    return state.measures[id].bars.map(barId => state.bars[barId]);
  },
  getBeats: (state) => (id) => {
    return state.bars[id].beats.map(beatId => state.beats[beatId]);
  },
  getChord: (state) => (id) => {
    return state.beats[id];
  },
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
