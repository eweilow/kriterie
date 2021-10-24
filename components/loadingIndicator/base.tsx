import Router from "next/router";
import React from "react";

function createDelayedTrigger() {
  let currentTimer!: NodeJS.Timer | null;
  let nextCallback!: () => void;
  return {
    trigger(cb: () => void, delay: number) {
      nextCallback = cb;
      if (currentTimer == null) {
        currentTimer = setTimeout(() => {
          currentTimer = null;
          nextCallback();
        }, delay);
      }
    },
    untrigger() {
      if (currentTimer != null) {
        clearTimeout(currentTimer);
        currentTimer = null;
      }
    },
  };
}

type Props = {
  delay: number;
  children: (loading: boolean) => React.ReactNode;
};
type State = {
  isLoadingPage: boolean;
};
export class LoadingIndicator extends React.PureComponent<Props, State> {
  state: State = {
    isLoadingPage: false,
  };

  startTrigger = createDelayedTrigger();

  onRouteChangeStart = () => {
    this.startTrigger.trigger(() => {
      this.setState({
        isLoadingPage: true,
      });
    }, this.props.delay);
  };

  onRouteChangeError = () => {
    this.startTrigger.untrigger();
    this.setState({
      isLoadingPage: false,
    });
  };

  onRouteChangeComplete = () => {
    this.startTrigger.untrigger();
    this.setState({
      isLoadingPage: false,
    });
  };

  componentDidMount() {
    Router.events.on("routeChangeStart", this.onRouteChangeStart);
    Router.events.on("routeChangeComplete", this.onRouteChangeComplete);
    Router.events.on("routeChangeError", this.onRouteChangeError);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.onRouteChangeStart);
    Router.events.off("routeChangeComplete", this.onRouteChangeComplete);
    Router.events.off("routeChangeError", this.onRouteChangeError);
  }

  render() {
    return this.props.children(this.state.isLoadingPage);
  }
}
