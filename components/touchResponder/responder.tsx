import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  DefaultTouchResponseOptions,
  TouchResponse,
  TouchResponseOptionsContext,
  TouchResponseShape
} from "./response";
import { Press } from "./types";

type TouchResponderProps = {
  activePress: Press | null;
  color: string;
  opacity: number;
  shape: TouchResponseShape;
};

export const TouchResponder: React.FC<TouchResponderProps> = props => {
  const [presses, setPresses] = useState<
    Array<{
      press: Press;
      index: number;
    }>
  >([]);
  const indexCounter = useRef(0);
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      const activePress = props.activePress;
      if (activePress != null) {
        setPresses(p => [
          ...p,
          {
            press: activePress,
            index: indexCounter.current
          }
        ]);
        ++indexCounter.current;
      }
    }, [props.activePress]);
  }

  function onFinished(index: number) {
    setPresses(p => p.filter(el => el.index !== index));
  }

  const ctxValue = useMemo(() => {
    return {
      ...DefaultTouchResponseOptions,
      color: props.color,
      opacity: props.opacity,
      shape: props.shape
    };
  }, [props.color, props.opacity, props.shape]);

  return (
    <TouchResponseOptionsContext.Provider value={ctxValue}>
      {presses.map(el => (
        <TouchResponse
          onFinished={() => onFinished(el.index)}
          key={el.index}
          press={el.press}
          active={el.press === props.activePress}
        />
      ))}
    </TouchResponseOptionsContext.Provider>
  );
};
