import {v4} from "uuid";
import React from "react";
import DialogQueueType from "../enums/DialogQueueType";

const collection = {} as DialogCollection;

function useDialog(namespace: string, config: DialogConfig): DialogCloseFn
function useDialog(namespace: string, queue: DialogQueueType, config: DialogConfig): DialogCloseFn
function useDialog(namespace: string, _queue: DialogQueueType | DialogConfig, _config?: DialogConfig): DialogCloseFn {
  const {instance_list} = getNamespace(namespace);
  const queue = !_config ? DialogQueueType.FIRST : _queue;
  const config = !_config ? _queue as DialogConfig : _config;

  const closeDialog = () => {
    for (let i = 0; i < instance_list.length; i++) {
      if (instance_list.at(i)?.config === config) instance_list.splice(i, 1);
    }
    updateListenerCollection(namespace);
  };

  const instance: DialogInstance = {namespace, config, closeDialog};
  switch (queue) {
    case DialogQueueType.FIRST:
      instance_list.unshift(instance);
      break;
    case DialogQueueType.NEXT:
      instance_list.splice(1, 0, instance);
      break;
    case DialogQueueType.LAST:
      instance_list.push(instance);
      break;
    default:
      throw new Error(`Unknown dialog queue type '${queue}' used.`);
  }

  updateListenerCollection(namespace);
  return closeDialog;
}

function updateListenerCollection(namespace: string) {
  const {callback_collection, instance_list} = getNamespace(namespace);
  const list = Object.values(callback_collection);
  for (let i = 0; i < list.length; i++) {
    const item = list.at(i);
    if (item) item(instance_list.at(0));
  }
}

export function registerDialog(namespace: string, callback: DialogUpdateCallbackFn) {
  const uuid = v4();
  const {instance_list, callback_collection} = getNamespace(namespace);
  callback_collection[uuid] = callback;
  callback(instance_list.at(0));
  return uuid;
}

export function deregisterDialog(namespace: string, uuid: string) {
  delete getNamespace(namespace).callback_collection[uuid];
}

function getNamespace(namespace: string) {
  return collection[namespace] ?? (collection[namespace] = {instance_list: [], callback_collection: {}});
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
  props?: React.HTMLProps<HTMLDivElement>;
}

export default useDialog;
