import EventManager, { Toast as ToastProps } from "../core/EventManager";
import React, { useEffect, useState } from "react";
import { clsx } from "../utils/clsx";
import Toast from "./Toast";
import { useNartlContext } from "./Context";

interface Props {
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
}

const NartlContainer = (props: Props) => {
  const [state, setState] = useState<ToastProps[]>([]);
  const options = useNartlContext();
  useEffect(() => {
    EventManager.setOptions(options);
    EventManager.subscribe(setState);
    return () => {
      EventManager.unsubscribe(setState);
    };
  }, []);
  console.log({ state });
  return (
    <div className={clsx("nartl-container", props.position)}>
      {state.map((e) => (
        <Toast {...e} key={e.id} />
      ))}
    </div>
  );
};

export default NartlContainer;
