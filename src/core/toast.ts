import React from "react";
import { ActionType, Toast } from "../types";
import { encapId } from "../utils/common";
import { addToast } from "./actions";
import { store } from "./store";

const getInitialToast: () => Partial<Toast> = () => ({
  id: encapId(),
  message: "",
  type: "info",
  timeout: undefined,
  animationDuration: undefined,
  height: 0,
  state: "none",
  close: () => {},
});

export const toast = (
  props: Partial<Toast> | string | ((props: Partial<Toast>) => JSX.Element)
) => {
  const options = () => {
    const initialToast = getInitialToast();
    const close = () => {
      store.dispatch({
        type: ActionType.UPDATE_TOAST,
        payload: { id: initialToast.id, state: "exiting" },
      });
    };
    const update = (__toast: Partial<Toast>) => {
      store.dispatch({
        type: ActionType.UPDATE_TOAST,
        payload: { id: initialToast.id, ...__toast },
      });
    };
    if (typeof props === "string") {
      return {
        ...initialToast,
        message: props,
      };
    }
    if (typeof props === "function") {
      return {
        ...initialToast,
        message: props({ ...initialToast, close }),
      };
    }
    return { ...initialToast, ...props, close, update };
  };
  const toastProps = options();
  addToast({ ...toastProps })(store.dispatch);
};
