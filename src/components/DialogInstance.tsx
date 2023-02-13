import React, {DetailedHTMLProps, HTMLAttributes, useContext} from "react";
import {DialogContext} from "../hooks/useDialog";
import Style from "./DialogInstance.module.css";


export function DialogInstance(props: DialogInstanceProps) {
  const {className, dismissible, children, ...component_method_props} = props;
  const {onMouseDown, onMouseUp, ...component_props} = component_method_props;
  
  const context = useContext(DialogContext);
  // const [dismiss, setDismiss] = useState<boolean>(false);
  
  const classes = [Style.Component];
  if (className) classes.push(className);
  
  return (
    <>
      <div className={Style.Overlay} onClick={onOverlayClick}></div>
      <div {...component_props} className={classes.join(" ")}>
        {children}
      </div>
    </>
  );
  
  function onOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented) return;
    context.close();
  }
}

type HTMLComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface DialogInstanceProps extends HTMLComponentProps {
  readonly namespace?: string;
  readonly closeable?: boolean;
  readonly dismissible?: boolean;
}
