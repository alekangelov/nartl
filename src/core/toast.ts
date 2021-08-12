import { IToast, ActionTypes } from "../types";
import { randomId } from "../utils/common";
import store from "./store";

class Toast implements IToast {
  animationDuration: number = 500;
  id: string = randomId();
  message: string;
  level: IToast["level"] = "info";
  state: IToast["state"] = "entering";
  timeout: number = 3000;
  setState: (state: IToast["state"]) => void = (state) => {
    this.state = state;
  };
  constructor(props?: Partial<IToast>) {
    Object.assign(this, props || {});
  }
}

export const toast = (props: Partial<IToast> | string) => {
  if (typeof props === "string") {
    return store.dispatch({
      type: ActionTypes.ADD_TOAST,
      payload: new Toast({
        message: props,
      }),
    });
  }
  store.dispatch({
    type: ActionTypes.ADD_TOAST,
    payload: new Toast(props),
  });
};
