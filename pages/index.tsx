import React from "react";
import {useDialog2} from "../src/hooks/useDialog2";
import Style from "./index.module.css";

function IndexPage() {
  
  const {queueDialog} = useDialog2();
  
  return (
    <div className={Style.Component}>
      <button onClick={onComponentClick}>Click me for dialog!</button>
    </div>
  );
  
  function onComponentClick() {
    queueDialog({
    
    });
  }
}

export default IndexPage;
