import classnames from "clsx";
import React from "react";

const InnerFallbackResponse = (props: {
  color: string;
  opacity: number;
  touching: boolean;
}) => {
  return (
    <span
      key="touchTarget"
      className={classnames("touchTarget", {
        touching: props.touching,
      })}
    >
      <style jsx>{`
        .touchTarget {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${props.color};
          transition: opacity 150ms;
          pointer-events: none;
          opacity: 0;
        }

        :global(*:active) > :global(span) > .touchTarget,
        .touchTarget.touching {
          opacity: ${props.opacity};
          transition: opacity 80ms;
        }
      `}</style>
    </span>
  );
};

export const FallbackResponse = React.memo(InnerFallbackResponse);
