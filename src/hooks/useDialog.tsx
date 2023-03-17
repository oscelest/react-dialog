import {createSubscription, Subscription, useSubscription} from "@noxy/react-subscription-hook";
import React from "react";
import {Dialog} from "../classes";
import {DialogInstance, DialogInstanceProps} from "../components";
import {DialogContext} from "../index";

const collection: DialogCollection = {};

export function useDialog(namespace: string = Dialog.default_namespace): UseDialogHook {
  if (!collection[namespace]) collection[namespace] = createSubscription<DialogList>([]);
  const [dialog_list, setDialogList] = useSubscription(collection[namespace]);
  return [getDialog(dialog_list.at(0)), createDialog];
  
  function createDialog(props: DialogInstanceProps = {}) {
    const dialog = new Dialog({props: {...props}, onClose, onSetPosition});
    setDialogList([...dialog_list, dialog].filter(item => item));
    return dialog;
  }
  
  function onClose(dialog: Dialog) {
    setDialogList([...dialog_list].filter(item => item && item !== dialog));
  }
  
  function onSetPosition(dialog: Dialog, position: number | DialogIndexFn) {
    const list = [...dialog_list].filter(item => item && item !== dialog);
    const index = typeof position === "function" ? position(list) : position;
    list.splice(index, 0, dialog);
    setDialogList(list);
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
  [namespace: string]: Subscription<DialogList>;
}
