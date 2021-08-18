import { ActionType, NartlOptions } from "../types";
import type { Toast } from "../types";
import { Dispatch } from "./store";
import { removeUndefinedProps } from "../utils/common";

export const addToast = (input: Toast) => (dispatch: Dispatch) =>
  dispatch({
    type: ActionType.ADD_TOAST,
    payload: input,
  });

export const updateOptions = (input: NartlOptions) => (dispatch: Dispatch) =>
  dispatch({
    type: ActionType.SET_OPTIONS,
    payload: removeUndefinedProps(input),
  });
