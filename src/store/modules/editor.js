import Vue from 'vue'
import Tab from './tab.js'
import Utils from './utils.js'

const state = {
  undoStack: [],
  redoStack: [],  
  changes: {},
  
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
  },
  pushToUndoStack(state, payload){
    state.undoStack.push(payload);
  },
  pushToRedoStack(state, payload){
    state.redoStack.push(payload);
  },
  clearRedoStack(state, commit){
    for(let change of state.redoStack){
      if(change.redoCallback === 'addBarReference'){
        commit('deleteBar', change.payload.id);
      }
    }
    state.redoStack = [];
  }
}

const actions = {
  loadTab({commit}, tab){
    commit('populateTab', tab)
  },
  queueNote({commit, state}, id){
    commit('selectNote', id);
    let currentNote = state.Tab.notes[id].note;
    Vue.set(state.changes, id, { id: id, value: currentNote });
    commit('setNote', { id: id, value: '' });
  },
  dequeueNote({commit, state}, id){
    commit('deselectNote', id);
    commit('setNote', { id: id, value: state.changes[id].value });
    Vue.delete(state.changes, id);
  },
  writeToNote({commit}, payload){
    commit('setNote', { id: payload.id, value: payload.value });
  },
  commitNoteChanges({commit, state}){
    commit('clearNoteSelections');
    commit('pushToUndoStack', {
      undoCallback: 'swapNoteBatch',
      redoCallback: 'swapNoteBatch',
      payload: state.changes
    });
    state.changes = {};
    commit('clearRedoStack', commit);
  },
  queueAddBar({commit}, index){
    let id = Utils.makeGUID();
    commit('addBar', { id: id, index: index });
    commit('pushToUndoStack', {
      undoCallback: 'removeBarReference',
      redoCallback: 'addBarReference',
      payload: { id: id, index: index }
    });
    commit('clearRedoStack', commit);
  },
  queueRemoveBar({commit, state}, id){
    let index = state.Tab.tab.bars.indexOf(id);
    commit('removeBarReference', { id: id, index: index });
    commit('pushToUndoStack', {
      undoCallback: 'addBarReference',
      redoCallback: 'removeBarReference',
      payload: { id: id, index: index }
    });
    commit('clearRedoStack', commit);
  },
  undo({commit, state}){
    let changeToUndo = state.undoStack.pop();
    commit(changeToUndo.undoCallback, changeToUndo.payload);
    commit('pushToRedoStack', changeToUndo);
  },
  redo({commit, state}){
    let changeToRedo = state.redoStack.pop();
    commit(changeToRedo.redoCallback, changeToRedo.payload);
    commit('pushToUndoStack', changeToRedo);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    Tab
  }
}
