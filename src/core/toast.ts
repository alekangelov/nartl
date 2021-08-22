import { Toast } from "../types";
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
  state: "entering",
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
  addToast(options())(store.dispatch);
};
