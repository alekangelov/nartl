import React, { useEffect, useState } from "react";
import { clsx } from "../utils/clsx";
import Toast from "./Toast";
import { useNartlContext } from "./Context";
import { IToast } from "../types";

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
  const [state, setState] = useState<IToast[]>([]);
  const store = useNartlContext();
  useEffect(() => {
    const onSubscribe = () => setState(store?.getState().toasts || []);
    store?.subscribe(onSubscribe);
    return () => {
      store?.unsubscribe(onSubscribe);
    };
  }, []);
  return (
    <div className={clsx("nartl-container", props.position)}>
      {state.map((e) => (
        <Toast {...e} key={e.id} />
      ))}
    </div>
  );
};

export default NartlContainer;
