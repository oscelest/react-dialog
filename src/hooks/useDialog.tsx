import {createSubscription, Subscription, useSubscription} from "@noxy/react-subscription-hook";
import React from "react";
import {DialogInstance} from "../classes";
import {DialogComponent} from "../components";
import {Dialog, DialogContext, DialogIndexFn, DialogProps, UseDialogHook} from "../index";

const collection: {[namespace: string]: Subscription<Dialog[]>} = {};

export function useDialog<ReturnValue>(namespace: string = DialogInstance.default_namespace): UseDialogHook<ReturnValue> {
  if (!collection[namespace]) collection[namespace] = createSubscription<Dialog[]>([]);
  const [dialog_list, setDialogList] = useSubscription(collection[namespace]);
  return [getDialog(dialog_list.at(0)), createDialog];
  
  function createDialog(props: DialogProps<ReturnValue> = {}) {
    const dialog = new DialogInstance({props: {...props}, onClose, onSetPosition});
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

function getDialog(instance: Dialog | undefined) {
  if (!instance) return null;
  
  return (
    <DialogContext.Provider value={instance}>
      <DialogComponent {...instance.props}/>
    </DialogContext.Provider>
  );
}
