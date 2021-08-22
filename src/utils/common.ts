import { CSSProperties, useEffect, useRef, useState } from "react";
import { AnyObject, IState, Toast } from "../types";

export const encapId = (() => {
  let count = 0;
  return () => count++;
})();

export const clsx = (...args: any[]): string =>
  args.reduce((acc, cls) => (cls ? `${acc} ${cls}` : acc), "").trim();

export const removeUndefinedProps = <T extends AnyObject = AnyObject>(
  obj: T
): Partial<T> => {
  const ret: AnyObject = {};
  const keys = Object.keys(obj) as any[];
  for (let i in keys) {
    if (obj[i] !== undefined) {
      (ret as any)[i] = obj[i];
    }
  }
  return ret as Partial<T>;
};

const initialDomRect = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
} as DOMRect;

export const useRectRef = (): [React.RefObject<HTMLDivElement>, DOMRect] => {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<DOMRect>(initialDomRect);
  useEffect(() => {
    if (ref.current) {
      setBounds(ref.current.getBoundingClientRect());
    }
  }, [ref.current]);
  return [ref, bounds];
};

export const getStyles = (toast: Toast, state: IState): CSSProperties => {
  if (!toast && !state) return { transform: "translate(0,0)" };
  const toastsBefore = state?.toasts?.filter((t) => t.id < toast.id) || [];
  const offset = toastsBefore?.reduce((acc, t) => {
    console.log(acc, t.height, state.options.gutter);
    return acc + t.height + state.options.gutter;
  }, 0);
  return {
    transform: `translate(0px, ${offset}px)`,
    animationDuration: `${toast.animationDuration}ms`,
    transitionDuration: `${toast.animationDuration}ms`,
  };
};
