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
    if(state.noteSelections[payload.parentId] === undefined){
      Vue.set(state.noteSelections, payload.parentId, { indices: [] } );
    }
    state.noteSelections[payload.parentId].indices.push(payload.index);
  },
  removeNoteSelection(state, payload){
    let toRemove = state.noteSelections[payload.parentId].indices.indexOf(payload.index);
    Vue.delete(state.noteSelections[payload.parentId].indices, toRemove);
  },
  clearNoteSelections(state){
    state.noteSelections = {};
  }
}

const Helpers = {
  commitChanges(commit, state){
    state.undoStack.push(state.changes);
    for(let change of state.changes){
      commit(change.mutationType, change.payload);
    }
    state.changes = [];
  }
}

const actions = {
  queueChange({commit, state}, entity){
    state.changes.push(entity);
    if(state.changes.length === Object.keys(state.noteSelections).length){
      Helpers.commitChanges(commit, state);
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
