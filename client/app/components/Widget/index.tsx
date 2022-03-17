import React, { Component } from "react";

interface ISize {
  w: number;
  h: number;
}

export interface IWidgetProps {
  x: number;
  y: number;
  sizes: {
    large: ISize;
    medium: ISize;
    small: ISize;
  };
  i: string;
}

interface IState {
  currentLag?: number | null;
  currentTab?: string;
  currentHash?: string;
}

export class Widget extends Component<IWidgetProps, IState> {
  constructor(props: IWidgetProps) {
    super(props);
    this.state = {
      currentLag: null,
      currentTab: window.connection?.connectionid,
      // DJL: We can get to this if we want to, but why would we want to?
      //     I'm not going to expose it unless you need moe to for some reason
      // currentHash: window.connection.getConnectionFromCookie(),
    };
  }

  componentDidMount() {
    // DJL: We could set this up as an event of course, but the timestamp simply perfoms the
    // ping/post/rsult sequence every 1000ms. It's guaranteed to change every 1000ms, so you could
    // also just set up your own timer. If you would like an "architecture defined timer", then I
    // we should set one up on purpose.
    // const eventEmitter = window.connection?.getEmitter;
    //
    // eventEmitter?.on("lagChanged", () => {
    //     const lag = window.connection?.getLag();
    //     this.setState({ currentLag: lag });
    // });
  }

  render() {
    const { currentLag, currentTab, currentHash } = this.state;

    return (
      <div
        style={{
          background: `var(--colorGreyThree)`,
          height: "100%",
        }}
      >
        Current tab: {currentTab} Current hash: {currentHash} CurrentLag:{" "}
        {currentLag}
      </div>
    );
  }
}

export default Widget;
