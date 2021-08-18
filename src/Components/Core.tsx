import * as React from "react";
import { StoreProvider, useNartlStore } from "../core/store";
import { NartlOptions, Toast as IToast } from "../types";

const Toast: React.FC<IToast> = (props) => {
  return <div key={`${props.id}-toast`}>{props.message}</div>;
};

export const NartlContainer: React.FC<{}> = () => {
  const { toasts, options } = useNartlStore();
  return (
    <div id="nartl-container" className={options?.position}>
      {toasts?.map(Toast)}
    </div>
  );
};

export const NartlProvider = (props: NartlOptions) => {
  console.log(props);
  return (
    <StoreProvider options={props}>
      <NartlContainer />
    </StoreProvider>
  );
};
