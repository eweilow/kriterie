import clsx from "clsx";
import { useCallback } from "react";

export const CriteriaLine: React.FC<{
  dense: boolean;
  onHoverIn?: (index: string | null) => void;
  onHoverOut?: (index: string | null) => void;
  isHovering?: boolean;
  index?: string;
}> = ({ onHoverIn, isHovering, onHoverOut, dense, index, children }) => {
  const onHoverInCb = useCallback(() => {
    onHoverIn?.(index ?? null);
  }, [onHoverIn, index]);

  const onHoverOutCb = useCallback(() => {
    onHoverOut?.(index ?? null);
  }, [onHoverOut, index]);

  return (
    <div
      className={clsx(
        dense ? "dense" : "space",
        isHovering ? "hovering" : null
      )}
      onMouseOver={onHoverInCb}
      onMouseLeave={onHoverOutCb}
    >
      {children}
      <style jsx>{`
        div {
          display: block;
          line-height: 1.15;
        }
        div.dense {
          display: inline;
        }
        div.space {
          margin: 0.45em 0;
        }
        div.space:first-child {
          margin-top: 0;
        }
        div.space:last-child {
          margin-bottom: 0;
        }

        div.hovering {
          background: #d4470012;
        }

        div::after {
          content: " ";
        }
      `}</style>
    </div>
  );
};
