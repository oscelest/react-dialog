import {v4} from "uuid";
import {DialogInstanceProps} from "../components";
import {DialogIndexFn} from "../hooks";

export class Dialog {
  
  public readonly props: DialogInstanceProps;
  
  private readonly onClose: onCloseHandler<this>
  private readonly onSetPosition: onSetPositionHandler<this>
  
  public static readonly default_namespace: string = "global";
  
  constructor(initializer: DialogInitializer<Dialog>) {
    this.props = {...initializer.props};
    this.onClose = initializer.onClose;
    this.onSetPosition = initializer.onSetPosition;
    
    if (this.props.id === undefined) this.props.id = v4();
  }
  
  public close() {
    this.onClose(this);
    this.props.onClose?.(this);
  }
  
  public setPosition(index: number | DialogIndexFn) {
    this.onSetPosition(this, index);
  }
}

export interface DialogInitializer<T extends Dialog> {
  props: DialogInstanceProps;
  onClose: onCloseHandler<T>;
  onSetPosition: onSetPositionHandler<T>;
}

type onCloseHandler<T extends Dialog> = (dialog: T) => void
type onSetPositionHandler<T extends Dialog> = (dialog: T, index: number | DialogIndexFn) => void
