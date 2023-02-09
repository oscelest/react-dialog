import {createContext} from "react";
import {DialogInstance, DialogInstanceProps} from "./DialogInstance";

const DialogProviderContext = createContext<DialogProviderContext>({});

export function DialogProvider(props: DialogProviderProps) {
  
  const {namespace = "global"} = props;
  
  return (
    <DialogProviderContext.Consumer>
      {renderValue}
    </DialogProviderContext.Consumer>
  );
  
  function renderValue(value: DialogProviderContext) {
    const instance = value[namespace]?.at(0);
    if (!instance) return null;
    
    return (
      <DialogInstance {...instance}/>
    );
  }
  
}

export interface DialogProviderProps {
  namespace?: string;
}

interface DialogProviderContext {
  [key: string]: DialogInstanceProps[];
}
