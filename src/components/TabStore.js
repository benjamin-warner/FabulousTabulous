/* eslint-disable */
export default {
  tab: {

  },

  loadTab: function(newTab){
    this.tab = newTab;
  },
  getTuning: function(){
    return this.tab.tuning;
  },
  getMeasures: function(){
    return this.tab.measures
  },
  getMeasure: function(measureIndex){
    return this.tab.measures[measureIndex];
  },
  getBars: function(measureIndex){
    return this.measures[measureIndex].bars;
  },
  getBar: function(measureIndex, barIndex){
    return this.tab.measures[measureIndex].bars[barIndex];
  },
  getBeat: function(measureIndex, barIndex, beatIndex){
    return this.tab.measures[measureIndex].bars[barIndex].beats[beatIndex];

  },
  getNote: function(measureIndex, barIndex, noteIndex){

  },
  setNote: function(measureIndex, barIndex, noteIndex, newNote){

  },
}