import { useState } from "react";
import {
  ActionTypes,
  InitialOptions,
  IStore,
  IToast,
  ToastActions,
} from "../types";
import { asyncDelay } from "../utils/common";
import { isEqual } from "../utils/isEqual";

const reducer = (state: IStore["state"], action: ToastActions) => {
  switch (action.type) {
    case ActionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case ActionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload.id),
      };
    case ActionTypes.UPDATE_TOAST:
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
    default:
      return state;
  }
};

class Store implements IStore {
  state: IStore["state"] = {
    toasts: [],
    options: InitialOptions,
  };

  subscribers: IStore["subscribers"] = [];

  listeners: IStore["listeners"] = {
    [ActionTypes.ADD_TOAST]: [],
    [ActionTypes.REMOVE_TOAST]: [],
    [ActionTypes.SET_TOAST_STATE]: [],
    [ActionTypes.UPDATE_TOAST]: [],
    [ActionTypes.PAUSE_TOAST]: [],
    [ActionTypes.RESUME_TOAST]: [],
    [ActionTypes.CLEAR_TOASTS]: [],
    [ActionTypes.SET_OPTIONS]: [],
  };

  emit = () => {
    this.subscribers.forEach((listener) => {
      listener(this.state.toasts);
    });
  };

  subscribe: IStore["subscribe"] = (callback) => {
    this.subscribers = [...this.subscribers, callback];
  };

  unsubscribe: IStore["unsubscribe"] = (callback) => {
    this.subscribers = this.subscribers.filter(
      (listener) => listener !== callback
    );
  };

  dispatch: IStore["dispatch"] = (action) => {
    const newState = reducer(this.state, action);
    this.state = Object.assign({}, newState);
    this.emitListeners(action.type, action.payload);
    this.emit();
  };
  getDispatch: IStore["getDispatch"] = () => this.dispatch;

  getSubscribers: IStore["getSubscribers"] = () => this.subscribers;

  getState: IStore["getState"] = () => this.state;

  queueLifecycle: IStore["queueLifecycle"] = async (toast: IToast) => {
    const { options } = this.state;
    const animationDuration =
      toast.animationDuration || options.animationDuration;
    const timeout = toast.timeout || options.timeout;
    await asyncDelay(animationDuration);
    toast.setState("entered");

    this.dispatch({
      type: ActionTypes.UPDATE_TOAST,
      payload: toast,
    });
    await asyncDelay(timeout);
    toast.setState("exiting");
    this.dispatch({
      type: ActionTypes.UPDATE_TOAST,
      payload: toast,
    });
    await asyncDelay(animationDuration);
    toast.setState("exited");
    this.dispatch({
      type: ActionTypes.REMOVE_TOAST,
      payload: toast,
    });
  };
  on: IStore["on"] = (event, callback) => {
    const listeners = this.listeners[event];
    listeners.push(callback);
  };
  emitListeners: IStore["emitListeners"] = (event, value) => {
    const listeners = this.listeners[event];
    listeners.forEach((listener) => {
      listener(value);
    });
  };
}

export const store = new Store();
store.on(ActionTypes.ADD_TOAST, (toast) => {
  store.queueLifecycle(toast);
});

export default store;
