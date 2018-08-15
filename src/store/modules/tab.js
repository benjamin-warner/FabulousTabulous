import Vue from 'vue'
import Utils from './utils.js'

const state = {}

const getters = {
  tuning: (state) => {
    return state.tuning;
  },
  sections: (state) => {
    return state.tab.sections.map(sectionId => state.sections[sectionId]);
  },
  sectionCount: (state) => {
    return state.tab.sections.length;
  },
  sectionLength: (state) => (id) => {
    return state.sections[id].bars.length;
  },
  barsOfSection: (state) => (id) => {
    return state.sections[id].bars.map(barId => state.bars[barId]);
  },
  beatsOfBar: (state) => (barId) => {
    return state.bars[barId].beats.map(beatId => state.beats[beatId]);
  },
  beat: (state) => (beatId) => {
    return state.beats[beatId];
  },
  notesOfBeat: (state) => (beatId) => {
    return state.beats[beatId].notes.map(noteId => state.notes[noteId]);
  },
  note: (state) => (noteId) => {
    return state.notes[noteId];
  }
}

const Helpers = {
  createBar(state, barId, parentId){
    Vue.set(state.bars, barId, { id: barId, parentId: parentId, beats: [] });
    while(state.bars[barId].beats.length < 4){
      let beatId = Utils.makeGUID();
      Vue.set(state.beats, beatId, { id: beatId, parentId: barId, notes: [] });
      while(state.beats[beatId].notes.length < 6){
        let noteId = Utils.makeGUID();
        Vue.set(state.notes, noteId, {id: noteId, parentId: beatId, note: ''});
        state.beats[beatId].notes.push(noteId);
      }
      state.bars[barId].beats.push(beatId);
    }
  },
  deleteBar(state, barId){
    for(let beatId of state.bars[barId].beats){
      for(let noteId of state.beats[beatId].notes){
        Vue.delete(state.notes, noteId)
      }
      Vue.delete(state.beats, beatId);
    }
    Vue.delete(state.bars, barId);
  }
}

const mutations = {
  populateTab(state, tab){
    Object.keys(tab).forEach(key => {
      Vue.set(state, key, tab[key]);
    });
  },
  addBar(state, payload){
    state.sections[payload.parentId].bars.splice(payload.index, 0, payload.id);
    Helpers.createBar(state, payload.id, payload.parentId);
  },
  addBarReference(state, payload){
    let parentId = state.bars[payload.id].parentId
    state.sections[parentId].bars.splice(payload.index, 0, payload.id);
  },
  removeBarReference(state, payload){
    let parentId = state.bars[payload.id].parentId;
    let barRefs = state.sections[parentId].bars;
    let index = barRefs.indexOf(payload.id);
    barRefs.splice(index, 1,);
  },
  deleteBar(state, barId){
    let parentId = state.bars[barId].parentId;
    let parent = state.sections[parentId];
    let barIndex = parent.bars.indexOf(barId);
    Vue.delete(parent.bars, barIndex);
    Helpers.deleteBar(state, barId);
  },
  replaceNote(state, payload){
    Vue.set(state.notes[payload.id], 'note', payload.value);
  }
}

export default {
  state,
  getters,
  mutations
}
