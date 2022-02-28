import classnames from "clsx";
import React from "react";

import { LoadingIndicator } from "./base";
import { LoadingIndicatorQueue } from "./queue";
import { LoadingTrickle } from "./trickle";

interface IProps {
  visible: boolean;
  transitionTime: number;
  color?: string;
}

export class LoadingBar extends React.Component<IProps> {
  static Wrapped = () => (
    <LoadingIndicator delay={200}>
      {(loading) => (
        <LoadingIndicatorQueue loading={loading} transitionTime={125}>
          {(visible, transitionTime) => (
            <>
              <LoadingBar visible={visible} transitionTime={transitionTime} />
            </>
          )}
        </LoadingIndicatorQueue>
      )}
    </LoadingIndicator>
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
        <LoadingTrickle trickleTime={transitionTime * 1.2}>
          {(progress) => (
            <div className="bar left">
              <div
                className="bar right"
                style={{
                  transform: `translate3d(${(progress * 100 - 100).toFixed(
                    2
                  )}%, 0, 0)`,
                }}
              />
            </div>
          )}
        </LoadingTrickle>
        <style jsx>{`
          .progress.exiting {
            transition: transform ${transitionTime}ms ease-in-out;
            transition-delay: ${transitionTime}ms;
          }

          .progress.exiting .bar {
            transition: transform ${transitionTime}ms ease-in-out;
          }

          .bar {
            transition: transform ${transitionTime}ms ease-in-out;
          }
        `}</style>
        <style jsx>{`
          .progress {
            z-index: 10001;

            position: fixed;
            left: 0;
            top: 0;
            right: 0;

            max-width: 100%;
            width: 1200px;
            margin: 0 auto;
          }

          .progress.exiting {
            transform-origin: left top;
            transform: scale3d(1, 0, 1) !important;
          }

          .progress.exiting .bar {
            transform: scale3d(1, 1, 1) !important;
          }

          .bar {
            height: 3px;
            transform-origin: left center;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
            overflow: hidden;
          }

          .bar.left {
          }

          .bar.right {
            background: ${this.props.color || "#fff"};
          }
        `}</style>
      </div>
    );
  }
}
