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

export class Widget extends Component<IWidgetProps> {
  render() {
    return <div>{this.props.i}</div>;
  }
}

export default Widget;
