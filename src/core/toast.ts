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

export const toast = (props: Partial<Toast> | string) => {
  const options = () => {
    const initialToast = getInitialToast();
    if (typeof props === "string") {
      return {
        ...initialToast,
        message: props,
      };
    }
    return { ...initialToast, ...props };
  };
  const toastProps = options();
  const close = () => {
    store.dispatch({
      type: ActionType.UPDATE_TOAST,
      payload: { id: toastProps.id, state: "exiting" },
    });
  };
  const update = (__toast: Partial<Toast>) => {
    store.dispatch({
      type: ActionType.UPDATE_TOAST,
      payload: { id: toastProps.id, ...__toast },
    });
  };
  addToast({ ...toastProps, close })(store.dispatch);

  return { close, update };
};
