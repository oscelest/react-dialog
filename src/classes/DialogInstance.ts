import {v4} from "uuid";
import {Dialog, DialogIndexFn, DialogProps, onCloseHandler, onSetPositionHandler} from "../index";

export class DialogInstance<ReturnValue = any> implements Dialog<ReturnValue> {
  
  public static readonly default_namespace: string = "global";
  public readonly props: DialogProps<ReturnValue>;
  private readonly onClose: onCloseHandler;
  private readonly onSetPosition: onSetPositionHandler;
  
  constructor(initializer: DialogInitializer<ReturnValue>) {
    this.props = {...initializer.props};
    this.onClose = initializer.onClose;
    this.onSetPosition = initializer.onSetPosition;
    
    if (this.props.id === undefined) this.props.id = v4();
  }
  
  public close(value?: ReturnValue) {
    this.onClose(this);
    this.props.onClose?.({dialog: this, value});
  }
  
  public setPosition(index: number | DialogIndexFn) {
    this.onSetPosition(this, index);
  }
}

interface DialogInitializer<ReturnValue> {
  props: DialogProps<ReturnValue>;
  onClose: onCloseHandler;
  onSetPosition: onSetPositionHandler;
}


