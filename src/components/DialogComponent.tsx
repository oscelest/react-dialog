import {Button} from "@noxy/react-button";
import {sanitizeClassName} from "@noxy/react-utils";
import React, {useContext} from "react";
import {DialogContext, DialogProps} from "../index";
import Style from "./DialogComponent.module.css";

export function DialogComponent(props: DialogProps) {
  const {className, overlay, closeable, dismissible, children, ...component_method_props} = props;
  const {...component_props} = component_method_props;
  const classes = sanitizeClassName(Style.Component, "dialog", className);
  const context = useContext(DialogContext);
  
  return (
    <>
      {renderOverlay()}
      <div {...component_props} className={classes}>
        {renderCloseButton()}
        {children}
      </div>
    </>
  );
  
  function onCloseButtonClick() {
    if (closeable === false) return;
    context.close();
  }
  
  function onOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || dismissible === false) return;
    context.close();
  }
  
  function renderOverlay() {
    if (overlay === false) return null;
  
    const classes = sanitizeClassName(Style.Overlay, "dialog-overlay");
  
    return (
      <div className={classes} onClick={onOverlayClick}/>
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
