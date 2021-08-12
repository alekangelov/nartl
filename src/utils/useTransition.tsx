/*
  jacked from: https://github.com/KutnerUri
  in: https://github.com/reactjs/react-transition-group/issues/479#issuecomment-707898660
*/
import { useEffect, useRef, useState } from "react";

enum TransitionStage {
  entering = "entering",
  entered = "entered",
  exiting = "exiting",
  exited = "exited",
  appear = "appear",
}

export default function useTransition(value: boolean, duration: number) {
  const [state, setState] = useState(
    value ? TransitionStage.appear : TransitionStage.exited
  );
  const isInitialRun = useRef(true);
  const durationRef = useRef(duration);
  durationRef.current = duration; // use latest

  useEffect(() => {
    if (isInitialRun.current) {
      isInitialRun.current = false;
      return () => {};
    }

    setState(value ? TransitionStage.entering : TransitionStage.exiting);
    const tmId = setTimeout(() => {
      const next = value ? TransitionStage.entered : TransitionStage.exited;
      setState(next);
    }, durationRef.current);

    return () => {
      if (tmId) clearTimeout(tmId);
    };
  }, [value]);

  return state;
}
