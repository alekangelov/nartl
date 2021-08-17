import React from "react";
import createStore from "../utils/fedux";

const initialState = {
  toasts: [],
  options: {
    autoClose: true,
    duration: 5000,
    animationDuration: 500,
    position: "bottom-right",
  },
};

const store = createStore<typeof initialState>(
  (state = initialState, action) => {
    if (action.type === "ADD_TOAST") {
    }
    return state;
  }
);

const StoreContext = React.createContext({} as typeof store);

const useStore = () => React.useContext(StoreContext);

export const StoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
