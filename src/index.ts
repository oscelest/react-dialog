import {HTMLComponentProps} from "@noxy/react-utils";
import {createContext} from "react";
import {Dialog} from "./classes";

export interface DialogEvent<ReturnValue = any> {
  dialog: Dialog;
  value?: ReturnValue;
}

export interface DialogProps<ReturnValue = any> extends HTMLComponentProps {
  readonly overlay?: boolean;
  readonly closeable?: boolean;
  readonly dismissible?: boolean;
  
  onClose?(event: DialogEvent<ReturnValue>): void;
}

export type onCloseHandler = (dialog: Dialog) => void
export type onSetPositionHandler = (dialog: Dialog, index: number | DialogIndexFn) => void

export type UseDialogHook<R = any> = [null | JSX.Element, DialogCreateFn<R>];
export type DialogCreateFn<R = any> = (props?: DialogProps<R>) => Dialog<R>;
export type DialogIndexFn = (list: readonly Dialog[]) => number

export const DialogContext = createContext<Dialog>({} as Dialog);

export {useDialog} from "./hooks";
