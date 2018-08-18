import Vue from 'vue'
import Tab from './tab.js'
import Utils from './utils.js'

const state = {
  undoStack: [],
  redoStack: [],  
  changes: [],
  
  noteSelections: [],
  notesDirty: false,
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
  noteSelectionsDirty: (state) => {
    return state.notesDirty;
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
    state.notesDirty = false;
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
        commit('deleteBar', change.id)
      }
    }
    state.redoStack = [];
  }
}

const actions = {
  loadTab({commit}, tab){
    commit('populateTab', tab)
  },
  queueNoteBackspace({commit, state}, id){
    if(!state.notesDirty){
      state.changes.push({ id: id, value: '' });
    } else {
      let currentNote = state.Tab.notes[id].note;
      state.changes.push({ id: id, value: currentNote.slice(0, -1) });
    }
    if(state.changes.length === state.noteSelections.length){
      if(!state.notesDirty){
        commit('pushToUndoStack', {
          undoCallback: 'swapNoteBatch',
          redoCallback: 'swapNoteBatch',
          payload: state.changes
        });
      }
      state.notesDirty = true;
      commit('swapNoteBatch', state.changes);
      state.changes = [];
    }
  },
  queueNoteEntry({commit, state}, payload){
    if(!state.notesDirty){
      state.changes.push({ id: payload.id, value: payload.value });
    } else {
      let currentNote = state.Tab.notes[payload.id].note;
      state.changes.push({ id: payload.id, value: currentNote + payload.value });
    }
    if(state.changes.length === state.noteSelections.length){
      if(!state.notesDirty){
        commit('pushToUndoStack', {
          undoCallback: 'swapNoteBatch',
          redoCallback: 'swapNoteBatch',
          payload: state.changes
        });
      }
      state.notesDirty = true;
      commit('swapNoteBatch', state.changes);
      state.changes = [];
    }
  },
  commitNoteChanges({state}){
    state.noteSelections = [];
    state.notesDirty = false;
  },
  abandonNoteChanges({commit, state}){
    if(state.notesDirty){
      let changeToAbandon = state.undoStack.pop();
      commit(changeToAbandon.undoCallback, changeToAbandon.payload);
      state.notesDirty = false;
    }
    state.noteSelections = [];
  },
  queueAddBar({commit}, payload){
    payload.id = Utils.makeGUID();
    commit('addBar', payload);
    commit('pushToUndoStack', {
      undoCallback: 'removeBarReference',
      redoCallback: 'addBarReference',
      payload: { id: payload.id, index: payload.index }
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
