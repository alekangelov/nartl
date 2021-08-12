import {
  ActionTypes,
  InitialOptions,
  NartlOptions,
  ToastAction,
} from "../types";

export const setOptions: ToastAction = (options: Partial<NartlOptions>) => ({
  type: ActionTypes.SET_OPTIONS,
  payload: { ...InitialOptions, ...options },
});
