import {v4} from "uuid";
import React from "react";
import DialogQueueType from "../enums/DialogQueueType";

const collection = {} as DialogCollection;

function useDialog(namespace: string, config: DialogConfig): DialogCloseFn
function useDialog(namespace: string, queue: DialogQueueType, config: DialogConfig): DialogCloseFn
function useDialog(namespace: string, _queue: DialogQueueType | DialogConfig, _config?: DialogConfig): DialogCloseFn {
  if (!collection[namespace]) collection[namespace] = {instance_list: [], callback_collection: {}};
  const queue = !_config ? DialogQueueType.FIRST : _queue;
  const config = !_config ? _queue as DialogConfig : _config;

  const list: DialogInstance[] = collection[namespace].instance_list;
  const closeDialog = () => {
    for (let i = 0; i < list.length; i++) {
      if (list.at(i)?.config === config) list.splice(i, 1);
    }
    updateListenerCollection(namespace);
  };

  const instance: DialogInstance = {namespace, config, closeDialog};
  switch (queue) {
    case DialogQueueType.FIRST:
      list.unshift(instance);
      break;
    case DialogQueueType.NEXT:
      list.splice(1, 0, instance);
      break;
    case DialogQueueType.LAST:
      list.push(instance);
      break;
    default:
      throw new Error(`Unknown dialog queue type '${queue}' used.`);
  }

  updateListenerCollection(namespace);
  return closeDialog;
}

function updateListenerCollection(namespace: string) {
  const list = Object.values(collection[namespace].callback_collection);
  for (let i = 0; i < list.length; i++) {
    const item = list.at(i);
    if (item) item(collection[namespace].instance_list.at(0));
  }
}

export function registerDialog(namespace: string, callback: DialogUpdateCallbackFn) {
  const uuid = v4();
  collection[namespace].callback_collection[uuid] = callback;
  callback(collection[namespace].instance_list.at(0));
  return uuid;
}

export function deregisterDialog(namespace: string, uuid: string) {
  delete collection[namespace].callback_collection[uuid];
}

export type DialogCloseFn = () => void;
export type DialogUpdateCallbackFn = (instance?: DialogInstance) => void

interface DialogCollection {
  [namespace: string]: DialogNamespace;
}

interface DialogNamespace {
  instance_list: DialogInstance[];
  callback_collection: {[uuid: string]: DialogUpdateCallbackFn};
}

export interface DialogInstance {
  namespace: string;
  config: DialogConfig;

  closeDialog(): void;
}

export interface DialogConfig {
  dismissible?: boolean;
  closeable?: boolean;
  component: JSX.Element;
  props?: React.HTMLProps<HTMLDivElement>
}

export default useDialog;
