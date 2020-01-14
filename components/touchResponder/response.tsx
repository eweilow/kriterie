import classnames from "clsx";
import React, { useContext, useState } from "react";

import { Press } from "./types";
import { useTimedEffect } from "./useTimedEffect";

type TouchResponseProps = {
  press: Press;
  active: boolean;
  onFinished: () => void;
};

type TouchResponseOptions = {
  responseEnterTime: number;
  fadeOutTime: number;
  minimumVisibleTime: number;
  opacityChangeTime: number;
  opacityInitialDelay: number;
  color: string;
  opacity: number;
  shape: TouchResponseShape;
};

export enum TouchResponseShape {
  Circular = "circular",
  Horizontal = "horizontal",
  Vertical = "vertical",
  NoRipple = "noRipple"
}

const debugTimeScale = 1;
export const DefaultTouchResponseOptions: Readonly<TouchResponseOptions> = {
  color: "#fff",
  opacity: 0.3,
  fadeOutTime: 550 * debugTimeScale,
  responseEnterTime: 550 * debugTimeScale,
  minimumVisibleTime: 80 * debugTimeScale,
  opacityChangeTime: 200 * debugTimeScale,
  opacityInitialDelay: 50 * debugTimeScale,
  shape: TouchResponseShape.Circular
};

export const TouchResponseOptionsContext = React.createContext<
  TouchResponseOptions
>(DefaultTouchResponseOptions);
TouchResponseOptionsContext.displayName = "TouchResponseOptionsContext";

export const TouchResponse: React.FC<TouchResponseProps> = props => {
  const {
    color,
    opacity,
    fadeOutTime,
    responseEnterTime,
    minimumVisibleTime,
    opacityChangeTime,
    opacityInitialDelay,
    shape
  } = useContext(TouchResponseOptionsContext);

  const [canExit, setCanExit] = useState(false);
  useTimedEffect(
    true,
    () => {
      setCanExit(true);
    },
    responseEnterTime
  );

  const [canFade, setCanFade] = useState(false);
  useTimedEffect(
    true,
    () => {
      setCanFade(true);
    },
    minimumVisibleTime
  );

  useTimedEffect(
    canExit && !props.active,
    () => {
      props.onFinished();
    },
    fadeOutTime
  );

  return (
    <div
      className={classnames("ripple", shape, {
        active: props.active || !canExit,
        actuallyActive: props.active || !canFade
      })}
      style={{
        left: props.press[0] - props.press[2],
        top: props.press[1] - props.press[2],
        width: props.press[2] * 2,
        height: props.press[2] * 2,
        borderRadius: props.press[2]
      }}
    >
      <style jsx>{`
        .ripple {
          position: absolute;
          background: ${color};
          transition: opacity ${opacityChangeTime}ms
            cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ripple.actuallyActive {
          opacity: ${opacity};
          transition-delay: ${opacityInitialDelay}ms;
        }
        .ripple:not(.actuallyActive) {
          opacity: 0;
          transition-duration: ${fadeOutTime}ms;
        }

        .ripple.circular.active {
          animation: circular-initial ${responseEnterTime}ms forwards
            cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ripple.circular:not(.active) {
          animation: circular-out ${fadeOutTime}ms forwards
            cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes circular-initial {
          from {
            transform: scale3d(0.01, 0.01, 0.01);
          }
          to {
            transform: scale3d(1, 1, 1);
          }
        }
        @keyframes circular-out {
          from {
            transform: scale3d(1, 1, 1);
          }
          to {
            transform: scale3d(1.05, 1.05, 1.05);
          }
        }

        .ripple.vertical {
          border-radius: 0;
        }
        .ripple.vertical.active {
          animation: vertical-initial ${responseEnterTime}ms forwards
            cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ripple.vertical:not(.active) {
          animation: vertical-out ${fadeOutTime}ms forwards
            cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes vertical-initial {
          from {
            transform: scale3d(1, 0.01, 0);
          }
          to {
            transform: scale3d(1, 1, 1);
          }
        }
        @keyframes vertical-out {
          from {
            transform: scale3d(1, 1, 1);
          }
          to {
            transform: scale3d(1.05, 1.05, 1.05);
          }
        }

        .ripple.horizontal {
          border-radius: 0;
        }
        .ripple.horizontal.active {
          animation: horizontal-initial ${responseEnterTime}ms forwards
            cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ripple.horizontal:not(.active) {
          animation: horizontal-out ${fadeOutTime}ms forwards
            cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes horizontal-initial {
          from {
            transform: scale3d(0.01, 1, 0);
          }
          to {
            transform: scale3d(1, 1, 1);
          }
        }
        @keyframes horizontal-out {
          from {
            transform: scale3d(1, 1, 1);
          }
          to {
            transform: scale3d(1.05, 1.05, 1.05);
          }
        }
      `}</style>
    </div>
  );
};
