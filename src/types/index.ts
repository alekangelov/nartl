export enum ActionTypes {
  ADD_TOAST = "NARTL/ADD_TOAST",
  SET_TOAST_STATE = "NARTL/SET_TOAST_STATE",
  REMOVE_TOAST = "NARTL/REMOVE_TOAST",
  PAUSE_TOAST = "NARTL/PAUSE_TOAST",
  RESUME_TOAST = "NARTL/RESUME_TOAST",
  CLEAR_TOASTS = "NARTL/CLEAR_TOASTS",
  SET_OPTIONS = "NARTL/SET_OPTIONS",
  UPDATE_TOAST = "NARTL/UPDATE_TOAST",
}

export const ActionTypeArray = [
  ActionTypes.ADD_TOAST,
  ActionTypes.SET_TOAST_STATE,
  ActionTypes.REMOVE_TOAST,
  ActionTypes.PAUSE_TOAST,
  ActionTypes.RESUME_TOAST,
  ActionTypes.CLEAR_TOASTS,
  ActionTypes.SET_OPTIONS,
  ActionTypes.UPDATE_TOAST,
];

export type ToastLevel = "info" | "success" | "warning" | "error";

export type ComponentOrString = string | React.ComponentType<any>;

type ToastState = "entering" | "entered" | "exiting" | "exited";

export interface IToast {
  id: string;
  level: ToastLevel;
  message: ComponentOrString;
  timeout: number;
  animationDuration: number;
  state: ToastState;
  setState: (state: ToastState) => void;
}

export type ToastActions =
  | {
      type: ActionTypes.ADD_TOAST;
      payload: IToast;
    }
  | {
      type: ActionTypes.REMOVE_TOAST;
      payload: IToast;
    }
  | {
      type: ActionTypes.SET_TOAST_STATE;
      payload: {
        id: IToast["id"];
        state: ToastState;
      };
    }
  | {
      type: ActionTypes.UPDATE_TOAST;
      payload: IToast;
    }
  | {
      type: ActionTypes.PAUSE_TOAST;
      payload: IToast;
    }
  | {
      type: ActionTypes.RESUME_TOAST;
      payload: IToast;
    }
  | {
      type: ActionTypes.CLEAR_TOASTS;
      payload: any;
    }
  | {
      type: ActionTypes.SET_OPTIONS;
      payload: NartlOptions;
    };

export type ToastAction = (input: any) => ToastActions;

type ToastCallback = (toasts: IToast[]) => any;
type OnCallback = (value: IToast) => any;

export type NartlOptions = {
  timeout: number;
  autoClose: boolean;
  defaultLevel: ToastLevel;
  animationDuration: number;
};

export const InitialOptions: NartlOptions = {
  timeout: 5000,
  autoClose: true,
  defaultLevel: "info",
  animationDuration: 500,
};

type IState = {
  toasts: IToast[];
  options: NartlOptions;
};

type ValueOf<T> = T[keyof T];

export interface IStore {
  dispatch: (action: ToastActions) => any;
  subscribe: (callback: ToastCallback) => any;
  unsubscribe: (callback: ToastCallback) => any;
  state: IState;
  subscribers: ToastCallback[];
  listeners: {
    [ActionTypes.ADD_TOAST]: OnCallback[];
    [ActionTypes.REMOVE_TOAST]: OnCallback[];
    [ActionTypes.SET_TOAST_STATE]: OnCallback[];
    [ActionTypes.UPDATE_TOAST]: OnCallback[];
    [ActionTypes.PAUSE_TOAST]: OnCallback[];
    [ActionTypes.RESUME_TOAST]: OnCallback[];
    [ActionTypes.CLEAR_TOASTS]: OnCallback[];
    [ActionTypes.SET_OPTIONS]: OnCallback[];
  };
  emit: () => any;
  getDispatch: () => IStore["dispatch"];
  getState: () => IStore["state"];
  getSubscribers: () => IStore["subscribers"];
  queueLifecycle: (toast: IToast) => any;
  on: (event: ActionTypes, callback: OnCallback) => any;
  emitListeners: (event: ActionTypes, value: IToast) => any;
}
