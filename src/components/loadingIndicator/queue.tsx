import React from "react";
import ReactDOM from "react-dom";

const waitForTime = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));

interface IProps {
  loading: boolean;
  transitionTime: number;
  portal?: boolean;
  children: (loading: boolean, transitionTime: number) => React.ReactNode;
}

interface IState {
  loading: boolean;
  nodeAdded: boolean;
  transitionTime: number;
}

export class LoadingIndicatorQueue extends React.PureComponent<IProps, IState> {
  state: IState = {
    loading: false,
    nodeAdded: false,
    transitionTime: this.props.transitionTime, // Copy at initialization
  };

  static defaultProps = {
    portal: true,
  };

  currentlyRunning = Promise.resolve();
  mounted = false;

  componentDidMount() {
    this.mounted = true;
    if (this.props.loading) {
      this.startWhenLoadingFinished();
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  enqueue(callback: (() => void) | null, waitFactory?: () => Promise<any>) {
    this.currentlyRunning = this.currentlyRunning.then(() => {
      if (this.mounted) {
        if (callback != null) {
          callback();
        }
        if (waitFactory != null) {
          return waitFactory();
        }
      }
      return;
    });
  }

  // Set state.loading to true when previous loading did finish
  startWhenLoadingFinished() {
    this.enqueue(
      () => {
        this.setState({
          loading: true,
          nodeAdded: true,
        });
      },
      () => waitForTime(this.state.transitionTime)
    );
  }

  setLoadingFinished() {
    this.enqueue(
      () => {
        this.setState({
          loading: false,
        });
      },
      () => waitForTime(this.state.transitionTime * 2)
    );
    this.enqueue(() => {
      this.setState({
        nodeAdded: false,
      });
    });
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.loading && !prevProps.loading) {
      this.startWhenLoadingFinished();
    } else if (!this.props.loading && prevProps.loading) {
      this.setLoadingFinished();
    }
  }

  render() {
    if (!(process as any).browser) {
      return null;
    }

    if (!this.state.nodeAdded) {
      return null;
    }

    if (this.props.portal) {
      return ReactDOM.createPortal(
        <>
          {this.props.children(this.state.loading, this.state.transitionTime)}
        </>,
        document.body
      );
    } else {
      return (
        <>
          {this.props.children(this.state.loading, this.state.transitionTime)}
        </>
      );
    }
  }
}
