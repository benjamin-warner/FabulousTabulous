import Vue from 'vue'
import Tab from './tab.js'
import Utils from './utils.js'

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
  },
  pushToUndoStack(state, payload){
    state.undoStack.push(payload);
  },
  pushToRedoStack(state, payload){
    state.redoStack.push(payload);
  },
  clearRedoStack(state, commit){
    for(let change of state.redoStack){
      if(change.type === 'removeBar'){
        commit('deleteBar', change.id)
      }
      if(change.type === 'removeSection'){
        commit('deleteSection', change.id)
      }
    }
    state.redoStack = [];
  },
}

const Helpers = {
  commitNotes(commit, state, getters){
    for(let change of state.changes){
      let oldValue = getters.note(change.payload.id).note;
      commit(change.mutation, change.payload);
      change.payload.value = oldValue;
    }
    if(state.changes.length !== 0){
      commit('pushToUndoStack', { type: 'noteEdited', notes: state.changes });
      commit('clearRedoStack', commit)
      state.changes = [];
    }
  }
}

const actions = {
  loadTab({commit}, tab){
    commit('populateTab', tab)
  },
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
    let parentId = state.Tab.bars[id].parentId;
    let index = state.Tab.sections[parentId].bars.indexOf(id);
    commit('removeBarReference', { id: id, index: index });
    commit('pushToUndoStack', {
      undoCallback: 'addBarReference',
      redoCallback: 'removeBarReference', 
      payload: { id: id, index: index } 
    });
    commit('clearRedoStack', commit);
  },
  queueAddSection({commit}, index){
    let id = Utils.makeGUID();
    commit('addSection', { index: index, id: id });
    commit('pushToUndoStack', {  
      undoCallback: 'removeSectionReference',
      redoCallback: 'addSectionReference', 
      payload: { id: id, index: index }
    });
    commit('clearRedoStack', commit);  
  },
  queueRemoveSection({commit, state}, id){
    let index = state.Tab.tab.sections.indexOf(id);
    commit('removeSectionReference', index);
    commit('pushToUndoStack', {  
      undoCallback: 'addSectionReference',
      redoCallback: 'removeSectionReference', 
      payload: { id: id, index: index}
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
