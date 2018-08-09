/* eslint-disable */
import Vue from 'vue'

const state = {
  undoStack: [],
  redoStack: [],  
  changes: [],
  
  noteSelections: {},
}

const getters = {
  isNoteSelected: (state) => (noteId) => {
    return state.noteSelections[noteId] !== undefined;
  },
  getNoteSelectionsOfBeat: (state, getters) => (beatId) =>{
    return getters.beat(beatId).notes.filter(noteId => state.noteSelections[noteId])
  }
}

const mutations = {
  selectNote(state, id){
    Vue.set(state.noteSelections, id, id);
  },
  deselectNote(state, id){
    Vue.delete(state.noteSelections, id);
  },
  clearNoteSelections(state){
    state.noteSelections = {};
  }
}

const Helpers = {
  commitChanges(commit, state){
    state.undoStack.push(state.changes);
    for(let change of state.changes){
      commit(change.mutation, change.payload);
    }
    state.changes = [];
  }
}

const actions = {
  queueChange({commit, state}, entity){
    state.changes.push(entity);
    if(state.changes.length === Object.keys(state.noteSelections).length){
      Helpers.commitChanges(commit, state)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
