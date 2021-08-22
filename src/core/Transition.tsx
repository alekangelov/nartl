import React, { useEffect, useRef, useState } from "react";

const Transition: React.FC<{}> = ({ children }) => {
  const [child, setChild] = useState<React.ReactChild | null>(null);
  const [childState, setChildState] = useState<
    "entering" | "entered" | "exiting" | "exited"
  >("entering");
  const timeout = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const singleChild = React.Children.only(children) as React.ReactChild;
    const currentTimeout = timeout;
    if (singleChild) {
      setChild(singleChild);
      setChildState("entering");
      currentTimeout.current = setTimeout(() => {
        setChildState("entered");
      }, 500);
    } else {
      setChildState("exiting");
      currentTimeout.current = setTimeout(() => {
        setChildState("exited");
      }, 500);
    }
    return () => currentTimeout.current && clearTimeout(currentTimeout.current);
  }, [children]);
  if (!child) return null;
  return (
    <>
      {React.cloneElement(child as any, {
        ...(child as any)?.props,
        transitionState: childState,
      })}
    </>
  );
};

export default Transition;
