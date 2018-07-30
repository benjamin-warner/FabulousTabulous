/* eslint-disable */
import TabStore from '../tabStore.js'

const ChangeMarshal = {

  tabReference: TabStore.tab,
  undoStack: [],
  redoStack: [],

  Type: Object.freeze({
    Removal: 1,
    Addition: 2,
  }),

  removeValue: function(propertyReference, index){
    var changeRecord = {
      reference: propertyReference,
      index: index,
      type: this.Type.Removal,
      oldValue: propertyReference[index],
    };
    this.undoStack.push(changeRecord);
    this.redoStack = [];
    propertyReference.splice(index, 1);
  },

  addValue: function(propertyReference, index, newValue){
    var changeRecord = {
      reference: propertyReference,
      index: index,
      type: this.Type.Addition,
    };
    this.undoStack.push(changeRecord);
    this.redoStack = [];
    propertyReference.splice(index, 0, newValue);
  },

  undoChange: function(){
    if(this.undoStack.length !== 0){
      var toUndo = this.undoStack.pop();
      switch(toUndo.type){
        case this.Type.Removal:
          toUndo.reference.splice(toUndo.index, 0, toUndo.oldValue);  
          break;
        case this.Type.Addition:
          toUndo.oldValue = toUndo.reference[toUndo.index];
          toUndo.reference.splice(toUndo.index,1);
        default:
          break;
      }
      this.redoStack.push(toUndo);
    }
  },

  redoChange: function(){
    if(this.redoStack.length !== 0){
      var toRedo = this.redoStack.pop();
      switch(toRedo.type){
        case this.Type.Removal:
          toRedo.reference.splice(toRedo.index, 1);
          break;
        case this.Type.Addition:
          toRedo.reference.splice(toRedo.index, 0, toRedo.oldValue);
        default:
          break;
      }
      this.undoStack.push(toRedo);
    }
  }
}

export default ChangeMarshal