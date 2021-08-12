import React from "react";
import NartlContainer from "./NartlContainer";
import { NartlProvider as NartlProviderContext } from "./Context";
import { NartlOptions } from "../types";

const NartlProvider: React.FC<{ options?: NartlOptions }> = ({
  options,
  children,
}) => {
  return (
    <NartlProviderContext options={options}>
      {children}
      <div id="nartl-root">
        <NartlContainer />
      </div>
    </NartlProviderContext>
  );
};

export default NartlProvider;
