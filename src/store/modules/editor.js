/* eslint-disable */
import Vue from 'vue'

const state = {
  undoStack: [],
  redoStack: [],  
  changes: [],
  
  noteSelections: [],
  selectionPointer: 0
}

const getters = {
  isNoteSelected: (state) => (noteId) => {
    return state.noteSelections.includes(noteId);
  },
  getNoteSelectionsOfBeat: (state, getters) => (beatId) =>{
    let beatNotes = getters.beat(beatId).notes;
    return state.noteSelections.filter(selection => beatNotes.includes(selection));
  },
  canUndo: (state) => {
    return state.undoStack.length !== 0;
  },
  canRedo: (state) =>  {
    return state.redoStack.length !== 0;
  }
}

const mutations = {
  selectNote(state, id){
    state.noteSelections.push(id);
  },
  deselectNote(state, id){
    let toDelete = state.noteSelections.indexOf(id);
    Vue.delete(state.noteSelections, toDelete);
  },
  clearNoteSelections(state){
    state.noteSelections = [];
  }
}

const Helpers = {
  commitNotes(commit, state, getters){
    for(let change of state.changes){
      let oldValue = getters.note(change.payload.id).note;
      commit(change.mutation, change.payload);
      change.payload.value = oldValue;
    }
    if(state.changes.length !== 0){
      state.undoStack.push(state.changes);
      state.redoStack = [];
      state.changes = [];
    }
  }
}

const actions = {
  queueNote({commit, state, getters}, entity){
    if(entity.payload.value !== getters.note(entity.payload.id).note){
      state.changes.push(entity);
    }
    state.selectionPointer++;
    if(state.selectionPointer === state.noteSelections.length){
      Helpers.commitNotes(commit, state, getters);
      state.selectionPointer = 0;
    }
  },
  undo({commit, state, getters}){
    let changesToUndo = state.undoStack.pop();
    for(let change of changesToUndo){
      let oldValue = getters.note(change.payload.id).note;
      commit(change.mutation, change.payload);
      change.payload.value = oldValue;
    }
    state.redoStack.push(changesToUndo);
  },
  redo({commit, state, getters}){
    let changesToRedo = state.redoStack.pop();
    for(let change of changesToRedo){
      let oldValue = getters.note(change.payload.id).note;
      commit(change.mutation, change.payload);
      change.payload.value = oldValue;
    }
    state.undoStack.push(changesToRedo);
  },  
}

export default {
  state,
  getters,
  mutations,
  actions
}
