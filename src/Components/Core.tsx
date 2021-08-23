import * as React from "react";
import { StoreProvider, useNartlStore, useStore } from "../core/store";
import { ActionType, NartlOptions, Toast as IToast } from "../types";
import { clsx, getStyles, useRectRef } from "../utils/common";

const Toast: React.FC<IToast> = (props) => {
  const { dispatch } = useStore();
  // const state = useNartlStore();
  const timeout = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const clearAnimation = React.useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = undefined;
    }
  }, []);
  const [ref, bounds] = useRectRef();
  const onExit = React.useCallback(() => {
    clearAnimation();
    dispatch({
      type: ActionType.UPDATE_TOAST,
      payload: {
        ...props,
        state: "exiting",
      },
    });
    console.log(props.animationDuration);
    timeout.current = setTimeout(() => {
      dispatch({
        type: ActionType.UPDATE_TOAST,
        payload: { ...props, state: "exited" },
      });
      dispatch({
        type: ActionType.REMOVE_TOAST,
        payload: props,
      });
    }, props.animationDuration - 10);
  }, []);
  const queueExit = React.useCallback(() => {
    clearAnimation();
    timeout.current = setTimeout(() => {
      onExit();
    }, props.timeout);
  }, []);
  const queueLifecycle = React.useCallback(() => {
    clearAnimation();
    timeout.current = setTimeout(() => {
      dispatch({
        type: ActionType.UPDATE_TOAST,
        payload: {
          ...props,
          state: "entering",
        },
      });
      timeout.current = setTimeout(() => {
        dispatch({
          type: ActionType.UPDATE_TOAST,
          payload: {
            ...props,
            state: "entered",
          },
        });
        queueExit();
      }, props.animationDuration);
    }, 50);
  }, []);
  React.useEffect(() => {
    const { state } = props;
    if (state === "none") {
      queueLifecycle();
    }
    if (state === "entered") {
      queueExit();
    }
    if (state === "exiting") {
      onExit();
    }
    return () => clearAnimation();
  }, [props.state]);
  React.useEffect(() => {
    queueLifecycle();
    return clearAnimation;
  }, []);
  return (
    <div
      ref={ref}
      // onMouseEnter={clearAnimation}
      // onMouseLeave={queueExit}
      onClick={onExit}
      className={clsx("toast-container", props.state)}
      style={{
        animationDuration: `${props.animationDuration}ms`,
        transition: `max-height ${props.animationDuration}ms`,

        willChange: "max-height",
        ...(props.state === "exiting" && { pointerEvents: "none" }),
        ...((props.state === "entered" || props.state === "entering") && {
          maxHeight: `${bounds.height || 300}px`,
        }),
      }}
    >
      <div className="toast-message">{props.message}</div>
    </div>
  );
};

export const NartlContainer: React.FC<{}> = () => {
  const { toasts, options } = useNartlStore();
  return (
    <div id="nartl-container" className={options?.position}>
      {toasts?.map((e) => (
        <Toast key={`${e.id}-toast`} {...e} />
      ))}
    </div>
  );
};

export const NartlProvider = (props: NartlOptions) => {
  return (
    <StoreProvider options={props}>
      <NartlContainer />
    </StoreProvider>
  );
};
