import Vue from 'vue'
import Utils from './utils.js'

const state = {}

const getters = {
  tuning: (state) => {
    return state.tuning;
  },
  barList: (state) => {
    return state.tab.bars;
  },
  bar: (state) => (id) => {
    return state.bars[id];
  },
  beatsOfBar: (state) => (id) => {
    return state.bars[id].beats.map(beatId => state.beats[beatId]);
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
  createBar(state, id){
    Vue.set(state.bars, id, { id: id, beats: [] });
    while(state.bars[id].beats.length < 4){
      let beatId = Utils.makeGUID();
      Vue.set(state.beats, beatId, { id: beatId, parentId: id, notes: [] });
      while(state.beats[beatId].notes.length < 6){
        let noteId = Utils.makeGUID();
        Vue.set(state.notes, noteId, {id: noteId, parentId: beatId, note: ''});
        state.beats[beatId].notes.push(noteId);
      }
      state.bars[id].beats.push(beatId);
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
    state.tab.bars.splice(payload.index, 0, payload.id);
  },
  removeBarReference(state, payload){
    let index = state.tab.bars.indexOf(payload.id);
    state.tab.bars.splice(index, 1,);
  },
  deleteBar(state, id){
    let index = state.tab.bars.indexOf(id);
    Vue.delete(state.tab.bars, index);
    Helpers.deleteBar(state, id);
  },
  setNote(state, payload){
    state.notes[payload.id].note = payload.value;
  },
  swapNoteBatch(state, batch){
    for(let id in batch){
      let oldNote = state.notes[id].note;
      Vue.set(state.notes[id], 'note', batch[id].value);
      batch[id].value = oldNote;
    }
  }
}

export default {
  state,
  getters,
  mutations
}
