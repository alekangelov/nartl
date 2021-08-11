import React from "react";
import NartlContainer from "./NartlContainer";
import { NartlOptions, NartlProvider as NartlProviderContext } from "./Context";

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
