import React, {useEffect, useState} from "react";
import {Dialog} from "../classes";
import {DialogInstance, DialogInstanceProps} from "../components";
import {DialogContext} from "../index";

const collection: DialogCollection = {};

export function useDialog(namespace: string = Dialog.default_namespace, test: string = ""): UseDialogHook {
  if (!collection[namespace]) collection[namespace] = [];
  const [dialog, setDialog] = useState<Dialog>();
  
  useEffect(() => {
    console.log("updating now", test);
    setDialog(collection[namespace].at(0));
  }, [collection[namespace].at(0)]);
  
  return [getDialog(dialog), createDialog];
  
  function createDialog(props: DialogInstanceProps = {}) {
    const dialog = new Dialog({props: {...props}, onClose, onSetPosition});
    collection[namespace] = [...collection[namespace], dialog].filter(item => item);
    setDialog(collection[namespace].at(0));
    
    return dialog;
  }
  
  function onClose(dialog: Dialog) {
    collection[namespace] = [...collection[namespace]].filter(item => item && item !== dialog);
    setDialog(collection[namespace].at(0));
  }
  
  function onSetPosition(dialog: Dialog, position: number | DialogIndexFn) {
    const list = [...collection[namespace]].filter(item => item && item !== dialog);
    const index = typeof position === "function" ? position(list) : position;
    list.splice(index, 0, dialog);
    collection[namespace] = list;
    setDialog(collection[namespace].at(0));
  }
}

function getDialog(instance?: Dialog) {
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

export type DialogList = Dialog[]

export interface DialogCollection {
  [namespace: string]: DialogList;
}
