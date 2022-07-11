import {DialogInstance, registerDialog, deregisterDialog} from "../hooks/useDialog";
import React, {useState, useRef, useEffect} from "react";

function Dialog(props: DialogProps) {
  const [click, setClick] = useState<boolean>();
  const [instance, setInstance] = useState<DialogInstance>();
  const ref_element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const uuid = registerDialog(props.namespace, instance => setInstance(instance));
    return () => deregisterDialog(props.namespace, uuid);
  }, [props.namespace]);

  const ref_click = useRef<boolean>();
  ref_click.current = click;

  if (!instance) return null;

  const classes = ["dialog"];
  const instance_classes = ["dialog-instance"];
  if (props.className) classes.push(props.className);
  if (instance.config.props?.className) instance_classes.push(instance.config.props?.className);

  return (
    <div ref={ref_element} {...instance.config.props} className={classes.join(" ")} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <div className={instance_classes.join(" ")}>
        {instance.config.closeable !== false && <div className={"dialog-instance-close"} onClick={handleClose}/>}
        {instance.config.component}
      </div>
    </div>
  );

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === ref_element.current && instance?.config.dismissible !== false) setClick(true);
    instance?.config.props?.onMouseDown?.(event);
  }

  function handleMouseUp(event: React.MouseEvent<HTMLDivElement>) {
    setClick(false);
    if (click && event.target === ref_element.current) {
      instance?.closeDialog();
    }
    else {
      instance?.config.props?.onMouseUp?.(event);
    }
  }

  function handleClose() {
    instance?.closeDialog();
  }
}

export interface DialogProps {
  className?: string;
  namespace: string;

  children?: never;
}


export default Dialog;
