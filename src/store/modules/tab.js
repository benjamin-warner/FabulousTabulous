import Vue from 'vue'
import Utils from './utils.js'

const state = {
  name: null,
  tuning: [],
  tab: {},
  bars: {},
  beats: {},
  notes: {},
}

const getters = {
  tabName: (state) => {
    return state.name;
  },
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
  },
  generateSaveTab: (state) =>{
    let tabClone = {
      name: state.name,
      tuning: state.tuning,
      tab: state.tab,
      bars: {},
      beats: {},
      notes: {}
    }
    tabClone.tab.bars.forEach( barId => {
      tabClone.bars[barId] = state.bars[barId];
    });
    Object.keys(tabClone.bars).forEach( barId => {
      for(let beatId of tabClone.bars[barId].beats){
        tabClone.beats[beatId] = state.beats[beatId];
      }
    });
    Object.keys(tabClone.beats).forEach( beatId => {
      for(let noteId of tabClone.beats[beatId].notes){
        tabClone.notes[noteId] = state.notes[noteId];
      }
    });
    return tabClone;
  }
}

const mutations = {
  setTabName(state, name){
    state.name = name;
  },
  populateTab(state, tab){
    Object.keys(tab).forEach(key => {
      Vue.set(state, key, tab[key]);
    });
  },
  addBar(state, payload){
    state.tab.bars.splice(payload.index, 0, payload.id);
    Vue.set(state.bars, payload.id, { id: payload.id, beats: [] });
    while(state.bars[payload.id].beats.length < 4){
      let beatId = Utils.makeGUID();
      Vue.set(state.beats, beatId, { id: beatId, parentId: payload.id, notes: [] });
      while(state.beats[beatId].notes.length < 6){
        let noteId = Utils.makeGUID();
        Vue.set(state.notes, noteId, {id: noteId, parentId: beatId, note: ''});
        state.beats[beatId].notes.push(noteId);
      }
      state.bars[payload.id].beats.push(beatId);
    }
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
    for(let beatId of state.bars[id].beats){
      for(let noteId of state.beats[beatId].notes){
        Vue.delete(state.notes, noteId)
      }
      Vue.delete(state.beats, beatId);
    }
    Vue.delete(state.bars, id);
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
