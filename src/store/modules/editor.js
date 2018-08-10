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
      commit('pushToUndoStack', { type: 'noteAltration', notes: state.changes });
      commit('clearRedoStack', commit)
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
  queueAddBar({commit, getters}, payload){
    commit('addBar', payload);
    // Actions can return this id. Look into it later.
    let id = getters.barIdViaSectionIndex({ parentId: payload.parentId, index: payload.index });
    commit('pushToUndoStack', { type: 'addBar', parentId: payload.parentId, index: payload.index, id: id });
  },
  queueRemoveBar({commit, getters}, barId){
    let parent = getters.barParent(barId);
    let index = parent.bars.indexOf(barId);
    commit('removeBarReference', { parentId: parent.id, index: index });
    commit('pushToUndoStack', { type: 'removeBar', parentId: parent.id, index: index, id: barId })
  },
  queueAddSection({commit, getters}, index){
    // Actions can return this id. Look into it later.
    commit('addSection', index);
    let id = getters.sectionIdViaTabIndex(index);
    console.log(index, id)
    commit('pushToUndoStack', { type: 'addSection', id: id, index: index });    
  },
  queueRemoveSection({commit, getters}, sectionId){
    let index = getters.sectionIndex(sectionId);
    console.log('remove', sectionId, index)
    commit('removeSectionReference', index);
    commit('pushToUndoStack', {type: 'removeSection', index: index, id: sectionId })
  },
  undo({commit, state, getters}){
    let changeToUndo = state.undoStack.pop();
    switch(changeToUndo.type){
      case 'removeBar':
        commit('addBarReference', { 
          parentId: changeToUndo.parentId, 
          index: changeToUndo.index , 
          barId: changeToUndo.id 
        });
        changeToUndo.type = 'addBar'
        break;      
      case 'addBar':
        commit('removeBarReference', { 
          parentId: changeToUndo.parentId, 
          index: changeToUndo.index 
        });
        changeToUndo.type = 'removeBar';
        break;
      case 'addSection':
        commit('removeSectionReference', changeToUndo.index);
        changeToUndo.type = 'removeSection';
        break;
      case 'removeSection':
        commit('addSectionReference', {
          index: changeToUndo.index,
          sectionId: changeToUndo.id
        });
        changeToUndo.type = 'addSection';
        break;
      case 'noteAltration':
        for(let change of changeToUndo.notes){
          let oldValue = getters.note(change.payload.id).note;
          commit(change.mutation, change.payload);
          change.payload.value = oldValue;
        }
        break;
    }
    commit('pushToRedoStack', changeToUndo);
  },
  redo({commit, state, getters}){
    let changeToRedo = state.redoStack.pop();
    switch(changeToRedo.type){
      case 'removeBar':
        commit('addBarReference', { 
          parentId: changeToRedo.parentId, 
          index: changeToRedo.index , 
          barId: changeToRedo.id 
        });
        changeToRedo.type = 'addBar'
        break;      
      case 'addBar':
        commit('removeBarReference', { 
          parentId: changeToRedo.parentId, 
          index: changeToRedo.index 
        });
        changeToRedo.type = 'removeBar';
        break;
      case 'addSection':
        commit('removeSectionReference', changeToRedo.index);
        changeToRedo.type = 'removeSection';
        break;
      case 'removeSection':
        commit('addSectionReference', {
          index: changeToRedo.index,
          sectionId: changeToRedo.id
        });
        changeToRedo.type = 'addSection';
        break;     
      case 'noteAltration':
        for(let change of changeToRedo.notes){
          let oldValue = getters.note(change.payload.id).note;
          commit(change.mutation, change.payload);
          change.payload.value = oldValue;
        }
        break;
      default:
        break;
    }
    commit('pushToUndoStack', changeToRedo);
  },  
}

export default {
  state,
  getters,
  mutations,
  actions
}
