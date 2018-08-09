/* eslint-disable */
import Vue from 'vue'

const state = {
  undoStack: [],
  redoStack: [],
  
  changes: [],
  
  noteSelections: {},
}

const getters = {
  getNoteSelections: (state) => {
    return state.noteSelections;
  },
  hasSelections: (state) => (beatId) => {
    if(state.noteSelections[beatId] !== undefined){
      return true;
    }
  },
  isNoteSelected: (state) => (payload) => {
    if(state.noteSelections[payload.parentId] === undefined){
      return false;
    }
    if(state.noteSelections[payload.parentId].indices.includes(payload.index)){
      return true;
    }
    return false;
  }
}

const mutations = {
  addNoteSelection(state, payload){
    console.log(payload.parentId)
    if(state.noteSelections[payload.parentId] === undefined){
      Vue.set(state.noteSelections, payload.parentId, { indices: [] } );
    }
    state.noteSelections[payload.parentId].indices.push(payload.index);
  },
  clearNoteSelections(state){
    state.noteSelections = {};
  }
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
