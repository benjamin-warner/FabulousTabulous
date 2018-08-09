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
  commitNotes(commit, state, getters){
    for(let change of state.changes){
      let oldValue = getters.note(change.payload.id).note;
      commit(change.mutation, change.payload);
      change.payload.value = oldValue;
    }
    state.undoStack.push(state.changes);
    state.changes = [];
  }
}

const actions = {
  queueNote({commit, state, getters}, entity){
    state.changes.push(entity);
    if(state.changes.length === Object.keys(state.noteSelections).length){
      Helpers.commitNotes(commit, state, getters)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
