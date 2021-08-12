import React, { useEffect, useRef } from "react";
import { ActionTypes, IStore, NartlOptions } from "../types";
import store from "../core/store";
import { setOptions } from "../core/actions";

const NartlContext = React.createContext<IStore | undefined>(undefined);

export const useNartlContext = () => React.useContext(NartlContext);

export const NartlProvider: React.FC<{ options?: Partial<NartlOptions> }> = ({
  children,
  options,
}) => {
  const storeRef = useRef(store);
  useEffect(() => {
    if (storeRef.current && options) {
      storeRef.current.dispatch(setOptions(options));
    }
  }, [storeRef.current, options]);
  return (
    <NartlContext.Provider value={storeRef.current}>
      {children}
    </NartlContext.Provider>
  );
};
