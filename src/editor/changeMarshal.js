/* eslint-disable */
import TabStore from '../tabStore.js'

const ChangeMarshal = {

  tabReference: TabStore.tab,
  undoStack: [],
  redoStack: [],

  removeValue: function(propertyReference, index){
    this.pushChange(propertyReference, index)
    propertyReference.splice(index, 1);
  },

  pushChange: function(propertyReference, index){
    var changeRecord = {
      reference: propertyReference,
      index: index,
      oldValue: propertyReference[index],
    };
    this.undoStack.push(changeRecord);
    this.redoStack = [];
  },

  undoChange: function(){
    if(this.undoStack.length !== 0){
      var toUndo = this.undoStack.pop();
      toUndo.reference.splice(toUndo.index, 0, toUndo.oldValue);
      this.redoStack.push();
    }
  },
  redoChange: function(){
    var toRedo = this.redoStack.pop();
    
  }
}

export default ChangeMarshal