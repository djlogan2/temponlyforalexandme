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
  constructor(props: IWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { i } = this.props;

    return <div>{i}</div>;
  }
}

export default Widget;
