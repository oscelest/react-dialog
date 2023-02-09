import {DialogInstanceProps} from "../components/DialogInstance";



export function useDialog2(namespace: string = "global"): IUseDialog {
  
  return {queueDialog, appendDialog, prependDialog};
  
  function queueDialog(dialog: DialogInstanceProps) {
    return addDialog(dialog);
  }
  
  function appendDialog(dialog: DialogInstanceProps) {
    return addDialog(dialog);
  }
  
  function prependDialog(dialog: DialogInstanceProps) {
    return addDialog(dialog);
  }
  
  function addDialog(dialog: DialogInstanceProps) {
    
    
    return () => console.log(dialog, namespace);
  }
}

interface IUseDialog {
  queueDialog(props: DialogInstanceProps): () => void;
  appendDialog(props: DialogInstanceProps): () => void;
  prependDialog(props: DialogInstanceProps): () => void;
}
