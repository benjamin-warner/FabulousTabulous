/* eslint-disable */
import Vue from 'vue'

const state = {
}

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
  barsOfSection: (state) => (sectionId) => {
    return state.sections[sectionId].bars.map(barId => state.bars[barId]);
  },
  barCountOfSection: (state) => (sectionId) => {
    let barReferences = state.sections[sectionId].bars;
    return Object.keys(barReferences).length;
  },
  isLastBar: (state) => (barId) => {
    let parentId = state.bars[barId].parentId;
    let barReferences = state.sections[parentId].bars;
    return barReferences[barReferences.length-1] === barId;
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
  makeGUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  },
  createSection(state, index){
    let sectionId = this.makeGUID();
    state.tab.sections.splice(index, 0, sectionId);
    Vue.set(state.sections, sectionId, { id: sectionId, bars: [] });
    
    let barId = this.makeGUID();
    this.createBar(state, barId, sectionId);
    state.sections[sectionId].bars.push(barId);
  },
  createBar(state, barId, parentId){
    Vue.set(state.bars, barId, { id: barId, parentId: parentId, beats: [] });
    while(state.bars[barId].beats.length < 4){
      let beatId = this.makeGUID();
      Vue.set(state.beats, beatId, { id: beatId, parentId: barId, notes: [] });
      while(state.beats[beatId].notes.length < 6){
        let noteId = this.makeGUID();
        Vue.set(state.notes, noteId, {id: noteId, parentId: beatId, note: ''});
        state.beats[beatId].notes.push(noteId);
      }
      state.bars[barId].beats.push(beatId);
    }
  },
  deleteSection(state, sectionId){
    for(let barId of state.sections[sectionId].bars){
      this.deleteBar(state, barId)
    }
    Vue.delete(state.sections, sectionId)
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
  addSection(state, index){
    Helpers.createSection(state, index);
  },
  addSectionReference(state, payload){
    state.tab.sections.splice(payload.index, 0, payload.sectionId);
  },
  removeSectionReference(state, index){
    state.tab.sections.splice(index, 1);
  },
  deleteSection(state, sectionId){
    Helpers.deleteSection(state, sectionId);
  },
  addBar(state, payload){
    let barId = Helpers.makeGUID();
    state.sections[payload.parentId].bars.splice(payload.index, 0, barId);
    Helpers.createBar(state, barId, payload.parentId);
  },
  addBarReference(state, payload){
    let barRefs = state.sections[payload.parentId].bars;
    barRefs.splice(payload.index, 0, payload.barId);
  },
  removeBarReference(state, payload){
    let barRefs = state.sections[payload.parentId].bars;
    barRefs.splice(payload.index, 1,);
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
