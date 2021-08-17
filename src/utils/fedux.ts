type Subscriber<I extends any> = (state: I) => any;

type SampleAction = {
  type: string;
  payload: any;
};

interface Action<T = any> {
  type: T;
}

interface AnyAction extends Action {
  [extraProps: string]: any;
}

interface ActionWithPayload extends AnyAction {
  payload?: any;
}

type Reducer<S extends any, F extends Action = ActionWithPayload> = (
  state: S,
  action: F
) => S;

// looks like I made redux 🤷‍♂️

function createStore<
  S,
  SX extends Subscriber<S> = Subscriber<S>,
  A extends Action = ActionWithPayload
>(reducer: Reducer<S | undefined, A>) {
  const listeners: SX[] = [];
  let state = reducer(undefined, { type: "@INIT" } as A);

  const subscribe = (subscriber: SX) => {
    listeners.push(subscriber);
    return () => {
      const index = listeners.indexOf(subscriber);
      listeners.splice(index, 1);
    };
  };

  const notify = (nextState: S) => {
    listeners.forEach((listener) => {
      listener(nextState);
    });
  };

  const dispatch = (action: A): S => {
    const nextState = reducer(state, action);
    if (!nextState) return state as S;
    state = nextState;
    notify(state);
    return nextState;
  };
  const unsubscribe = (subscriber: SX) => {
    const index = listeners.indexOf(subscriber);
    listeners.splice(index, 1);
  };

  const getState = () => state as S;

  return {
    subscribe,
    unsubscribe,
    notify,
    dispatch,
    getState,
  };
}

export default createStore;
