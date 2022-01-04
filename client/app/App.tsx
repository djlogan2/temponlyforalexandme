import _ from "lodash";
import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import Widget from "./components/Widget";

const ReactGridLayout = WidthProvider(RGL);

const sizes = {
  small: {
    w: 2,
    h: 2,
  },
  medium: {
    w: 4,
    h: 4,
  },
  large: {
    w: 6,
    h: 6,
  },
};

interface IDefaultProps {
  className: string;
  items: number;
  rowHeight: number;
  onLayoutChange: (layout: RGL.Layout[]) => void;
  cols: number;
}

interface IState {
  layout: RGL.Layout[];
}

export default class App extends React.PureComponent<IDefaultProps, IState> {
  static defaultProps = {
    className: "layout",
    items: 30,
    rowHeight: 30,
    onLayoutChange: function () {},
    cols: 12,
  };

  constructor(props: IDefaultProps) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function (item, i) {
      const y: any = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
      };
    });
  }

  onLayoutChange = (layout: RGL.Layout[]) => {
    this.props.onLayoutChange(layout);
  };

  render() {
    return (
      <ReactGridLayout
        {...this.props}
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        useCSSTransforms={true}
        allowOverlap={true}
        preventCollision
      >
        {this.state.layout.map((_, i) => (
          <div
            key={i}
            style={{
              background: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255,
              )}, ${Math.floor(Math.random() * 255)})`,
            }}
          >
            <span className="text">
              {i}
              {/* <Widget sizes={sizes} {...layout} /> */}
            </span>
          </div>
        ))}
      </ReactGridLayout>
    );
  }
}
