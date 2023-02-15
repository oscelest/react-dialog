import React, {DetailedHTMLProps, HTMLAttributes, useContext} from "react";
import {Dialog} from "../classes";
import {DialogContext} from "../hooks";
import Style from "./DialogInstance.module.css";

export function DialogInstance(props: DialogInstanceProps) {
  const {className, closeable, dismissible, children, ...component_method_props} = props;
  const {onMouseDown, onMouseUp, ...component_props} = component_method_props;
  
  const context = useContext(DialogContext);
  
  const classes = [Style.Component];
  if (className) classes.push(className);
  
  return (
    <>
      <div className={Style.Overlay} onClick={onOverlayClick}></div>
      <div {...component_props} className={classes.join(" ")}>
        {renderCloseButton()}
        {children}
      </div>
    </>
  );
  
  function onOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || dismissible === false) return;
    context.close();
  }
  
  function renderCloseButton() {
    if (closeable === false) return null;
    
    return (
      <div className={"dialog-close-button"}></div>
    )
  }
}

type HTMLComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface DialogInstanceProps extends HTMLComponentProps {
  readonly closeable?: boolean;
  readonly dismissible?: boolean;
  
  onClose?(dialog: Dialog): void;
}
