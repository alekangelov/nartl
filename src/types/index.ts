export type ToastPoistion =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastType = "info" | "success" | "warning" | "error";

export type NartlOptions = {
  autoClose: boolean;
  timeout: number;
  maxToasts: number;
  animationDuration: number;
  position: ToastPoistion;
  gutter: number;
};

export const initialOptions: NartlOptions = {
  autoClose: true,
  timeout: 5000,
  maxToasts: 10,
  animationDuration: 500,
  position: "bottom-right",
  gutter: 16,
};

export type Toast = {
  id: number;
  message: string;
  timeout: number;
  animationDuration: number;
  type: ToastType;
  height: number;
  state: ToastState;
  close: () => any;
};

export type IState = {
  toasts: Array<Toast>;
  options: NartlOptions;
};

export enum ActionType {
  ADD_TOAST = "ADD_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
  UPDATE_TOAST = "UPDATE_TOAST",
  SET_OPTIONS = "SET_OPTIONS",
}

export type Actions =
  | {
      type: ActionType.ADD_TOAST;
      payload: Toast;
    }
  | {
      type: ActionType.REMOVE_TOAST;
      payload: Toast;
    }
  | {
      type: ActionType.SET_OPTIONS;
      payload: NartlOptions;
    }
  | {
      type: ActionType.UPDATE_TOAST;
      payload: Toast;
    };
export type AnyObject = Record<any, any>;

export type ToastState = "entering" | "entered" | "exiting" | "exited";
