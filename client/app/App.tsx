import _ from "lodash";
import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import Widget from "./components/Widget";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

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
    constructor(props: IDefaultProps) {
        super(props);

        const layout = this.generateLayout();
        this.state = { layout };
    }

    onLayoutChange = (layout: RGL.Layout[]) => {
        const { onLayoutChange } = this.props;
        onLayoutChange(layout);
    };

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
                minW: sizes.small.w,
                maxW: sizes.large.w,
                minH: sizes.small.h,
                maxH: sizes.large.h,
            };
        });
    }

    render() {
        const { layout } = this.state;

        return (
            <ReactGridLayout {...this.props} layout={layout} onLayoutChange={this.onLayoutChange} useCSSTransforms allowOverlap preventCollision>
                {layout.map((options) => (
                    <div key={options.i}>
                        <Widget sizes={sizes} {...options} />
                    </div>
                ))}
            </ReactGridLayout>
        );
    }
}

export const defaulApptProps = {
    className: "layout",
    items: 30,
    rowHeight: 30,
    onLayoutChange() {},
    cols: 12,
};
