/* eslint-disable */
import Vue from 'vue'

const state = {
  undoStack: [],
  redoStack: [],
  
  selections: 0,
  changes: []
}

const getters = {
}

const mutations = {
  incrementSelections(state, count) {
    state.selections += count;
  },
  decrementSelections(state, count) {
    state.selections -= count;
  },
  resetSelections(state){
    state.selections = 0;
  },
}
const actions = {
  queueChange({commit, state}, payload){
    state.changes.push(payload);
    if(state.changes.length === state.selections){
      state.undoStack.push(state.changes);
      for(let change of state.changes){
        commit(change.type, change.content);
      }
      state.changes = [];
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
