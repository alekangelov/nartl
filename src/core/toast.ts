import { randomId } from "../utils/common";
import EventManager, { Toast } from "./EventManager";

export const toast = (props: string | Toast) => {
  let toastProps = {} as Toast;
  if (typeof props === "string") {
    toastProps.message = props;
    toastProps.type = "info";
  } else {
    toastProps = props;
  }
  toastProps.id = randomId();
  return EventManager.add(toastProps);
};
