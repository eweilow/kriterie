import classnames from "clsx";
import React from "react";

import { LoadingTrickle } from "./trickle";
import { LoadingIndicatorQueue } from "./queue";

interface IProps {
  visible: boolean;
  transitionTime: number;
}

export class SearchLoadingBar extends React.Component<IProps> {
  static Wrapped: React.FC<{ loading: boolean }> = ({ loading }) => (
    <LoadingIndicatorQueue
      portal={false}
      loading={loading}
      transitionTime={195}
    >
      {(visible, transitionTime) => (
        <>
          <SearchLoadingBar visible={visible} transitionTime={transitionTime} />
        </>
      )}
    </LoadingIndicatorQueue>
  );

  render() {
    const { visible, transitionTime } = this.props;
    return (
      <div
        className={classnames("progress", {
          visible,
          exiting: !visible,
        })}
      >
        <LoadingTrickle trickleTime={200} factor={0.2}>
          {(progress) => (
            <div
              className="bar"
              style={{
                transform: `scale3d(${progress.toFixed(2)}, 1, 1)`,
              }}
            />
          )}
        </LoadingTrickle>
        <style jsx>{`
          .bar {
            transition: transform ${transitionTime}ms ease-in-out,
              opacity ${transitionTime}ms ease-in-out;
          }
        `}</style>
        <style jsx>{`
          .progress {
            z-index: 10001;

            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;

            max-width: 100%;
            width: 1200px;
            margin: 0 auto;

            pointer-events: none;
          }

          .progress.exiting .bar {
            transform: scale3d(1, 1, 1) !important;
            opacity: 0;
          }

          .bar {
            height: 100%;
            transform-origin: left center;
            background: rgba(255, 255, 255, 0.25);
          }
        `}</style>
      </div>
    );
  }
}
