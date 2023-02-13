import {createContext, useEffect, useState} from "react";
import {Dialog} from "../classes/Dialog";
import {DialogInstance, DialogInstanceProps} from "../components/DialogInstance";

export const collection: DialogCollection = {};

export const DialogContext = createContext<DialogType>({} as DialogType);

export function useDialog(namespace: string = Dialog.default_namespace): UseDialogHook {
  if (!collection[namespace]) collection[namespace] = [];
  const [dialog, setDialog] = useState<DialogType>();
  useEffect(() => setDialog(collection[namespace].at(0)), [collection[namespace]]);
  
  return [getDialog(dialog), createDialog];
  
  function createDialog(props: DialogInstanceProps = {}) {
    const dialog = new Dialog({props: {...props}, onClose, onSetPosition});
    collection[namespace] = [...collection[namespace], dialog].filter(item => item);
    setDialog(collection[namespace].at(0));
    
    return dialog;
  }
  
  function onClose(dialog: DialogType) {
    collection[namespace] = [...collection[namespace]].filter(item => item && item !== dialog);
    setDialog(collection[namespace].at(0));
  }
  
  function onSetPosition(dialog: DialogType, index: number | DialogIndexFn) {
  
  }
}

function getDialog(instance?: DialogType) {
  if (!instance) return null;
  
  return (
    <DialogContext.Provider value={instance}>
      <DialogInstance {...instance.props}></DialogInstance>
    </DialogContext.Provider>
  );
}

export type UseDialogHook = [null | JSX.Element, DialogCreateFn];

export type DialogCreateFn = (props?: DialogInstanceProps) => Dialog;
export type DialogIndexFn = (list: readonly Dialog[]) => number

export type DialogType = Dialog
export type DialogList = DialogType[]

export interface DialogCollection {
  [namespace: string]: DialogList;
}
