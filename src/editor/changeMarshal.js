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
    this.pushChange(propertyReference, index, this.Type.Removal)
    propertyReference.splice(index, 1);
  },

  pushChange: function(propertyReference, index, type){
    var changeRecord = {
      reference: propertyReference,
      index: index,
      type: type,
      oldValue: propertyReference[index],
    };
    this.undoStack.push(changeRecord);
    this.redoStack = [];
  },

  undoChange: function(){
    if(this.undoStack.length !== 0){
      var toUndo = this.undoStack.pop();
      switch(toUndo.type){
        case this.Type.Removal:
          toUndo.reference.splice(toUndo.index, 0, toUndo.oldValue);  
          break;
        default:
          break;
      }
      this.redoStack.push(toUndo);
    }
  },

  redoChange: function(){
    console.log('redoing...')
    if(this.redoStack.length !== 0){
      var toRedo = this.redoStack.pop();
      switch(toRedo.type){
        case this.Type.Removal:
          toRedo.reference.splice(toRedo.index, 1);
          break;
        default:
          break;
      }
      this.undoStack.push(toRedo);
    }
  }
}

export default ChangeMarshal