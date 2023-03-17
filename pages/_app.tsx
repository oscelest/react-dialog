import {AppProps} from "next/app";
import React from "react";
import {useDialog} from "../src";

function Application({Component, pageProps}: AppProps) {
  const [dialog] = useDialog("global");
  
  return (
    <>
      <Component {...pageProps}></Component>
      {dialog}
    </>
  );
}

export default Application;
