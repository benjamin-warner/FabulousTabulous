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
  },
  revertChange(commit, getters, reversion){
    switch(reversion.type){
      case 'removeBar':
        commit('addBarReference', { parentId: reversion.parentId, index: reversion.index , barId: reversion.id });
        reversion.type = 'addBar'
        break;      
      case 'addBar':
        commit('removeBarReference', { parentId: reversion.parentId, index: reversion.index });
        reversion.type = 'removeBar';
        break;
      case 'addSection':
        commit('removeSectionReference', reversion.index);
        reversion.type = 'removeSection';
        break;
      case 'removeSection':
        commit('addSectionReference', { index: reversion.index, sectionId: reversion.id });
        reversion.type = 'addSection';
        break;
      case 'noteEdited':
        for(let change of reversion.notes){
          let oldValue = getters.note(change.payload.id).note;
          commit(change.mutation, change.payload);
          change.payload.value = oldValue;
        }
        break;
      default:
        break;
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
  queueAddBar({commit, getters}, payload){
    commit('addBar', payload);
    // Actions can return this id. Look into it later.
    let id = getters.barIdViaSectionIndex({ parentId: payload.parentId, index: payload.index });
    commit('pushToUndoStack', { type: 'addBar', parentId: payload.parentId, index: payload.index, id: id });
    commit('clearRedoStack', commit);
  },
  queueRemoveBar({commit, getters}, barId){
    let parent = getters.barParent(barId);
    let index = parent.bars.indexOf(barId);
    commit('removeBarReference', { parentId: parent.id, index: index });
    commit('pushToUndoStack', { type: 'removeBar', parentId: parent.id, index: index, id: barId });
    commit('clearRedoStack', commit);
  },
  queueAddSection({commit, getters}, index){
    // Actions can return this id. Look into it later.
    commit('addSection', index);
    let id = getters.sectionIdViaTabIndex(index);
    commit('pushToUndoStack', { type: 'addSection', id: id, index: index });  
    commit('clearRedoStack', commit);  
  },
  queueRemoveSection({commit, getters}, sectionId){
    let index = getters.sectionIndex(sectionId);
    commit('removeSectionReference', index);
    commit('pushToUndoStack', {type: 'removeSection', index: index, id: sectionId });
    commit('clearRedoStack', commit);
  },
  undo({commit, state, getters}){
    let changeToUndo = state.undoStack.pop();
    Helpers.revertChange(commit, getters, changeToUndo);
    commit('pushToRedoStack', changeToUndo);
  },
  redo({commit, state, getters}){
    let changeToRedo = state.redoStack.pop();
    Helpers.revertChange(commit, getters, changeToRedo);
    commit('pushToUndoStack', changeToRedo);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
