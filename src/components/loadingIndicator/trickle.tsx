import React from "react";

interface IProps {
  children: (progress: number) => JSX.Element;
  trickleTime: number;
  factor: number;
}

interface IState {
  progress: number;
  trickleTime: number;
}

export class LoadingTrickle extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    factor: 0.1,
  };

  state: IState = {
    progress: 0,
    trickleTime: this.props.trickleTime, // Copy at init
  };

  trickleTimeout: NodeJS.Timer | null = null;

  componentDidMount() {
    this.trickleTimeout = setTimeout(this.trickle, this.state.trickleTime);
  }

  componentWillUnmount() {
    if (this.trickleTimeout != null) {
      clearTimeout(this.trickleTimeout);
    }
  }

  trickle = () => {
    this.setState(
      (state) => {
        const remainder = 1 - state.progress;
        return {
          progress:
            state.progress + Math.random() * remainder * this.props.factor,
        };
      },
      () => {
        this.trickleTimeout = setTimeout(this.trickle, this.state.trickleTime);
      }
    );
  };

  render() {
    return this.props.children(this.state.progress);
  }
}
