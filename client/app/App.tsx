import React, { useEffect, useState } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import ClientConnection from "/lib/client/ClientConnection";
import Stoppable from "/lib/Stoppable";
import Widget from "./components/Widget";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

class ClientServer extends Stoppable {
    private connection: ClientConnection;

    constructor() {
        super(null);
        this.connection = new ClientConnection(this);
    }

    protected stopping(): void {
        throw new Error("Method not implemented.");
    }
}

window.ClientServer = new ClientServer();

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

const App = ({ onLayoutChange, ...rest }) => {
    const generateLayout = () => _.map(new Array(rest.items), function (item, i) {
            const y: any = _.result(rest, "y") || Math.ceil(Math.random() * 4) + 1;
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

    const [layout, updateLayout] = useState(generateLayout());

    return <ReactGridLayout
                {...rest}
                layout={layout}
                onLayoutChange={onLayoutChange}
                useCSSTransforms
                allowOverlap
                preventCollision
    >
                {layout.map((options) => (
                    <div key={options.i}>
                        <Widget sizes={sizes} {...options} />
                    </div>
                ))}
            </ReactGridLayout>;
};

export default App;

export const defaulApptProps = {
    className: "layout",
    items: 1,
    rowHeight: 30,
    onLayoutChange() {},
    cols: 12,
};
