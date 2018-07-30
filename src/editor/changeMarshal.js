/* eslint-disable */
import TabStore from '../tabStore.js'

const ChangeMarshal = {

  tabReference: TabStore.tab,
  undoStack: [],
  redoStack: [],

  Type: Object.freeze({
    Delete: 1,
    Create: 2,
    Update: 3,
  }),

  removeValue: function(propertyReference, index){
    this.pushToChangeStack(propertyReference, index, propertyReference[index], this.Type.Delete);
    propertyReference.splice(index, 1);
  },

  addValue: function(propertyReference, index, newValue){
    this.pushToChangeStack(propertyReference, index, newValue, this.Type.Create);
    propertyReference.splice(index, 0, newValue);
  },

  updateValue: function(propertyReference, index, newValue){
    this.pushToChangeStack(propertyReference, index, propertyReference[index], this.Type.Update);
    propertyReference.splice(index, 1, newValue);
  },

  pushToChangeStack(propertyReference, index, revertValue, type){
    var changeRecord = {
      reference: propertyReference,
      index: index,
      type: type,
      revertValue: revertValue
    };
    this.undoStack.push(changeRecord);
    this.redoStack = [];
  },

  undoChange: function(){
    if(this.undoStack.length !== 0){
      var toUndo = this.undoStack.pop();
      switch(toUndo.type){
        case this.Type.Delete:
          toUndo.reference.splice(toUndo.index, 0, toUndo.revertValue);  
          break;
        case this.Type.Create:
          toUndo.reference.splice(toUndo.index,1);
          break;
        case this.Type.Update:
          var newRevertValue = toUndo.reference[toUndo.index];
          toUndo.reference.splice(toUndo.index, 1, toUndo.revertValue);
          toUndo.revertValue = newRevertValue;
          break;
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
        case this.Type.Delete:
          toRedo.reference.splice(toRedo.index, 1);
          break;
        case this.Type.Create:
          toRedo.reference.splice(toRedo.index, 0, toRedo.revertValue);
          break;
        case this.Type.Update:
          var newRevertValue = toRedo.reference[toRedo.index];
          toRedo.reference.splice(toRedo.index, 1, toRedo.revertValue);
          toRedo.revertValue = newRevertValue;
          break;          
        default:
          break;
      }
      this.undoStack.push(toRedo);
    }
  }
}

export default ChangeMarshal