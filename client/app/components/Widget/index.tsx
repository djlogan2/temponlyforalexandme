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
    };
  }

  render() {
    const { currentLag, currentTab, currentHash } = this.state;

    return (
      <div
        style={{
          background: `#a8a8a8`,
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
