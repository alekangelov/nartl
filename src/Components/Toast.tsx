import React from "react";
import { IToast } from "../types";
import useTransition from "../utils/useTransition";

const Toast = (props: IToast) => {
  console.log(props.state);
  return <div>{props.message}</div>;
};

export default Toast;
