import React, { useEffect, useState } from "react";
import {
  Actions,
  ActionType,
  initialOptions,
  IState,
  NartlOptions,
  Toast,
} from "../types";
import createStore from "../utils/fedux";

const initialState: IState = {
  toasts: [],
  options: initialOptions,
};

export const store = createStore<typeof initialState>(
  (state = initialState, action: Actions) => {
    if (action.type === ActionType.ADD_TOAST) {
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    }
    if (action.type === ActionType.REMOVE_TOAST) {
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
      };
    }
    if (action.type === ActionType.SET_OPTIONS) {
      return {
        ...state,
        options: action.payload,
      };
    }
    if (action.type === ActionType.UPDATE_TOAST) {
      return {
        ...state,
        toasts: state.toasts.map((toast) => {
          if (toast.id === action.payload.id) {
            return {
              ...toast,
              ...action.payload,
            };
          }
          return toast;
        }),
      };
    }
    return state;
  }
);

const StoreContext = React.createContext({} as typeof store);

export type Dispatch = typeof store.dispatch;

export const useStore = () => React.useContext(StoreContext);

export const useToasts = () => {
  const [state, setState] = useState<Toast[]>([]);
  const store = useStore();
  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setState(store.getState().toasts)
    );
    return () => unsubscribe();
  }, []);
  return state;
};

export const useNartlStore = () => {
  const [state, setState] = useState<Partial<IState>>({});
  const store = useStore();
  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    return () => unsubscribe();
  }, []);
  return state;
};

export const StoreProvider: React.FC<{ options?: NartlOptions }> = ({
  children,
  options,
}) => {
  useEffect(() => {
    console.log(options);
    store.dispatch({
      type: ActionType.SET_OPTIONS,
      payload: {
        ...initialOptions,
        ...options,
      },
    });
  }, [options]);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
