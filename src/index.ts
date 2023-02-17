import {createContext} from "react";
import {Dialog} from "./classes";

export const DialogContext = createContext<Dialog>({} as Dialog);
export {useDialog, type UseDialogHook, type DialogIndexFn} from "./hooks";
