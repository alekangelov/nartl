import { AnyObject } from "../types";

export const encapId = (() => {
  let count = 0;
  return () => count++;
})();

export const clsx = (...args: any[]): string =>
  args.reduce((acc, cls) => (cls ? `${acc} ${cls}` : acc), "");

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
