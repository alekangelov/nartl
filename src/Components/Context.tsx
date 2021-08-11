import { ToastType } from "core/EventManager";
import React from "react";

export interface NartlOptions {
  timeout?: number;
  autoClose?: boolean;
  defaultLevel?: ToastType;
}

const initialState = {
  timeout: 3000,
  autoClose: true,
  defaultLevel: "info",
} as NartlOptions;

const NartlContext = React.createContext(initialState);

export const useNartlContext = () => React.useContext(NartlContext);

export const NartlProvider: React.FC<{ options?: NartlOptions }> = ({
  children,
  options,
}) => (
  <NartlContext.Provider value={{ ...initialState, ...options }}>
    {children}
  </NartlContext.Provider>
);
