import React from "react";
import {useDialog} from "../src/hooks/useDialog";
import Style from "./index.module.css";

function IndexPage() {
  const [dialog, createDialogGlobal] = useDialog("global");
  const [dialog2, createDialogGlobal2] = useDialog("global");
  const [dialog3, createDialogTest] = useDialog("test");
  
  return (
    <div className={Style.Component}>
      {dialog}
      {dialog2}
      {dialog3}
      <button onClick={onComponentClick}>Click me for dialog!</button>
    </div>
  );
  
  function onComponentClick() {
    createDialogGlobal({id: "1"});
    createDialogGlobal({id: "2"});
    createDialogTest({id: "3"});
    createDialogTest({id: "4"});
    createDialogGlobal({id: "5"});
    createDialogTest({id: "6"});
    createDialogGlobal2({id: "7"});
    createDialogGlobal2({id: "8"});
  }
}

export default IndexPage;
