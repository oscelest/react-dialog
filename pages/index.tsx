import React from "react";
import {useDialog} from "../src";
import Style from "./index.module.css";

function IndexPage() {
  const [, createDialogGlobal] = useDialog("global", "index");
  
  return (
    <div className={Style.Component}>
      <button onClick={onComponentClick}>Click me for dialog!</button>
    </div>
  );
  
  function onComponentClick() {
    createDialogGlobal({id: "1"});
  }
}

export default IndexPage;
