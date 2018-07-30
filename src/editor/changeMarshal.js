/* eslint-disable */
const ChangeMarshal = function(){
  var undoStack = [];
  var redoStack = [];

  var Type = Object.freeze({
    Delete: 1,
    Create: 2,
    Update: 3,
  });

  function removeValue(propertyReference, index){
    pushToChangeStack(propertyReference, index, propertyReference[index], Type.Delete);
    propertyReference.splice(index, 1);
  }

  function addValue(propertyReference, index, newValue){
    pushToChangeStack(propertyReference, index, newValue, Type.Create);
    propertyReference.splice(index, 0, newValue);
  }

  function updateValue(propertyReference, index, newValue){
    pushToChangeStack(propertyReference, index, propertyReference[index], Type.Update);
    propertyReference.splice(index, 1, newValue);
  }

  function pushToChangeStack(propertyReference, index, revertValue, type){
    var changeRecord = {
      reference: propertyReference,
      index: index,
      type: type,
      revertValue: revertValue
    };
    undoStack.push(changeRecord);
    redoStack = [];
  }

  function undoChange(){
    if(undoStack.length !== 0){
      var toUndo = undoStack.pop();
      switch(toUndo.type){
        case Type.Delete:
          toUndo.reference.splice(toUndo.index, 0, toUndo.revertValue);  
          break;
        case Type.Create:
          toUndo.reference.splice(toUndo.index,1);
          break;
        case Type.Update:
          var newRevertValue = toUndo.reference[toUndo.index];
          toUndo.reference.splice(toUndo.index, 1, toUndo.revertValue);
          toUndo.revertValue = newRevertValue;
          break;
        default:
          break;
      }
      redoStack.push(toUndo);
    }
  }

  function redoChange(){
    if(redoStack.length !== 0){
      var toRedo = redoStack.pop();
      switch(toRedo.type){
        case Type.Delete:
          toRedo.reference.splice(toRedo.index, 1);
          break;
        case Type.Create:
          toRedo.reference.splice(toRedo.index, 0, toRedo.revertValue);
          break;
        case Type.Update:
          var newRevertValue = toRedo.reference[toRedo.index];
          toRedo.reference.splice(toRedo.index, 1, toRedo.revertValue);
          toRedo.revertValue = newRevertValue;
          break;          
        default:
          break;
      }
      undoStack.push(toRedo);
    }
  }
  return {
    addValue: addValue,
    removeValue: removeValue,
    updateValue: updateValue,
    undoChange: undoChange,
    redoChange: redoChange
  }
}();

export default ChangeMarshal