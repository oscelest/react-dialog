import React, {createContext, DetailedHTMLProps, HTMLAttributes, useState} from "react";
import {v4} from "uuid";
import Style from "./DialogInstance.module.css"

const DialogInstanceContext = createContext({});

export function DialogInstance(props: DialogInstanceProps) {
  const {className, closeable, dismissible, children, ...component_method_props} = props;
  const {...component_props} = component_method_props;
  
  const [id] = useState<string>(v4());
  
  const classes = [Style.Component];
  if (className) classes.push(className);
  
  return (
    <DialogInstanceContext.Provider value={props}>
      <div {...component_props} className={classes.join(" ")}>
        {children}
      </div>
    </DialogInstanceContext.Provider>
  );
}

type HTMLComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>


export interface DialogInstanceProps extends HTMLComponentProps {
  closeable?: boolean;
  dismissible?: boolean;
}

