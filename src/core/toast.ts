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

type ToastFN = (props: Partial<Toast>) => JSX.Element;

type ToastProps = Partial<Toast> | string | ToastFN;

const getOptions = (props: ToastProps) => {
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
  const methods = { close, update };
  if (typeof props === "string") {
    return {
      ...initialToast,
      message: props,
      ...methods,
    };
  }
  if (typeof props === "function") {
    return {
      ...initialToast,
      message: props({ ...initialToast, ...methods }),
      ...methods,
    };
  }
  return { ...initialToast, ...props, ...methods };
};

export const toast = (props: ToastProps, renderer: ToastFN) => {
  let toastProps = getOptions(props);
  if (renderer) {
    toastProps = {
      ...toastProps,
      message: renderer(toastProps),
    };
  }
  addToast({ ...toastProps })(store.dispatch);
};

export const makeToast = (toastFn: ToastFN) => {
  return (props: ToastProps) => {
    return toast(props, toastFn);
  };
};
