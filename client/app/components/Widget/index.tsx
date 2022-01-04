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
        const { i } = this.props;

        return (
            <div
                style={{
                    background: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
                    height: "100%",
                }}
            >
                {i}
            </div>
        );
    }
}

export default Widget;
