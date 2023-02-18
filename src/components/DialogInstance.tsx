import {Button} from "@noxy/react-button";
import React, {DetailedHTMLProps, HTMLAttributes, useContext} from "react";
import {Dialog} from "../classes";
import {DialogContext} from "../index";
import Style from "./DialogInstance.module.css";

export function DialogInstance(props: DialogInstanceProps) {
  const {className, overlay, closeable, dismissible, children, ...component_method_props} = props;
  const {...component_props} = component_method_props;
  
  const context = useContext(DialogContext);
  
  const classes = [Style.Component, "dialog"];
  if (className) classes.push(className);
  
  return (
    <>
      {renderOverlay()}
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
  
  function onCloseButtonClick() {
    if (closeable === false) return;
    context.close();
  }
  
  function renderOverlay() {
    if (overlay === false) return null;
    
    const classes = [Style.Overlay, "dialog-overlay"];
    
    return (
      <div className={classes.join(" ")} onClick={onOverlayClick}/>
    );
  }
  
  function renderCloseButton() {
    if (closeable === false) return null;
    
    return (
      <Button className={"dialog-close-button"} onSubmit={onCloseButtonClick}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="5" x2="95" y2="95"/>
          <line x1="5" y1="95" x2="95" y2="5"/>
        </svg>
      </Button>
    );
  }
}

type HTMLComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface DialogInstanceProps extends HTMLComponentProps {
  readonly overlay?: boolean;
  readonly closeable?: boolean;
  readonly dismissible?: boolean;
  
  onClose?(dialog: Dialog): void;
}
